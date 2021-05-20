const puppeteer = require("puppeteer");
const request = require("request-promise");
const poll = require("promise-poller").default;
require("dotenv").config();
const siteDetails = {
	sitekey: "6LdC-hIaAAAAALLCgO92mcNONQ-7MGIxmJd82kw5",
	pageurl: "https://www.walmart.ca/",
};

const store = async function (searchWords) {
	const options = {
		headless: false,
		executablePath:
			"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
		sloMo: 10,
	};

	var browser = await puppeteer.launch(options);
	var page = await browser.newPage();
	await page.setDefaultTimeout(120000);
	await page.setViewport({ height: 1200, width: 960 });

	await page.setUserAgent(
		"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36",
	);

	await page.goto(`https://www.walmart.ca/search?q=${searchWords}`, {
		waitUntil: "networkidle2",
	});

	const requestId = await initiateCaptchaRequest(process.env.API_KEY);
	const response = await pollForRequestResults(process.env.API_KEY, requestId);
	console.log("got response: ", response);

	//-----------------------------------------------
	// currently not working unless done manually in the terminal
	await page.evaluate(
		`document.getElementById("g-recaptcha-response").innerHTML="${response}";`,
	);
	await page.evaluate(token => {
		console.log("inside arrow function");
		handleCaptcha(token);
	}, response);
	//-----------------------------------------------

	await page.waitForSelector("#product-results > div:nth-child(1)");

	let result = await page.evaluate(() => {
		let topResults = [];

		for (var j = 1; j < 7; j++) {
			const productID = document
				.querySelector(`#product-results > div:nth-child(${j}) > div`)
				.getAttribute("data-product-id");
			const image = document
				.querySelector(
					`#product-results > div:nth-child(${j}) > div > a > div:nth-child(1) > div:nth-child(1) > img`,
				)
				.getAttribute("src");

			const grocItem = document.querySelector(
				`#product-results > div:nth-child(${j}) > div > a > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > p`,
			).innerText;

			// const title = grocItem.substr(0, grocItem.indexOf("|"));

			const price = document.querySelector(
				`#product-results > div:nth-child(${j}) > div > a > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div > span > span`,
			).innerText;

			// const capacity = grocItem.substr(grocItem.indexOf("|") + 2);
			const capacity = document.querySelector(
				`#product-results > div:nth-child(${j}) > div > a > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > p`,
			).innerText;

			//function to get the capacity of each item as a number
			const val = C => {
				var capacity = C.toLowerCase();
				var value;

				if (capacity.includes("x")) {
					capacity = capacity.split("x").find(str => {
						return str.includes("l") || str.includes("g");
					});
				}

				if (
					capacity.includes("pkg") ||
					capacity.includes("pack") ||
					capacity.includes("cup") ||
					capacity.includes("cans") ||
					capacity.includes("count") ||
					capacity.includes("ea")
				) {
					value = 1;
				} else if (capacity.includes("kg")) {
					value = parseFloat(capacity) * 1000;
				} else if (capacity.includes("g") || capacity.includes("ml")) {
					value = parseFloat(capacity);
					return value;
				} else if (capacity.includes("l")) {
					value = parseFloat(capacity) * 1000;
				} else {
					value = 1;
				}
				return value;
			};
			//function to get the quantity in item
			const qty = C => {
				var capacity = C.toLowerCase();
				var qty;
				if (capacity.includes("x")) {
					capacity = capacity.split("x").find(str => {
						return (
							!str.toLowerCase().includes("l") && !str.toLowerCase().includes("g")
						);
					});
					return capacity.match(/\d+/g).map(Number)[0];
				}
				if (
					capacity.includes("pkg") ||
					capacity.includes("pack") ||
					capacity.includes("cup") ||
					capacity.includes("cans") ||
					capacity.includes("count") ||
					capacity.includes("ea")
				) {
					qty = capacity.match(/\d+/g).map(Number)[0];
				} else {
					qty = 1;
				}
				return qty;
			};

			const quantity = qty(capacity);

			const value = val(capacity);

			topResults.push({
				store: "Walmart",
				productID: productID || "n/a",
				image: image || "n/a",
				title: grocItem || "n/a",
				price: price || "n/a",
				capacity: capacity || "n/a",
				value: value,
				quantity: quantity,
			});
		}
		return topResults;
	});
	return result;

	await page.waitFor(2000);
	await page.close();
	await browser.close();
};

async function initiateCaptchaRequest(apiKey) {
	console.log("initiating Captcha Request");
	const formData = {
		method: "userrecaptcha",
		googlekey: siteDetails.sitekey,
		key: apiKey,
		pageurl: siteDetails.pageurl,
		json: 1,
	};
	const response = await request.post("http://2captcha.com/in.php", {
		form: formData,
	});
	console.log("response received!", response);
	return JSON.parse(response).request;
}

async function pollForRequestResults(
	key,
	id,
	retries = 30,
	interval = 1500,
	delay = 15000,
) {
	console.log("Polling for requests");
	await timeout(delay);
	const pollResult = poll({
		taskFn: requestCaptchaResults(key, id),
		interval,
		retries,
	});
	console.log(pollResult);
	return pollResult;
}

function requestCaptchaResults(apiKey, requestId) {
	console.log("Requesting Recaptcha results with api key:", apiKey);
	const url = `http://2captcha.com/res.php?key=${apiKey}&action=get&id=${requestId}&json=1`;
	return async function () {
		return new Promise(async function (resolve, reject) {
			const rawResponse = await request.get(url);
			const resp = JSON.parse(rawResponse);
			console.log(resp);
			if (resp.status === 0) return reject(resp.request);
			console.log("finished requests");
			resolve(resp.request);
		});
	};
}

const timeout = millis => new Promise(resolve => setTimeout(resolve, millis));

module.exports = { store };
