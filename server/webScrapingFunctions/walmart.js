const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
require("dotenv").config();
puppeteer.use(StealthPlugin());
const Client = require("@infosimples/node_two_captcha");

client = new Client(process.env.API_KEY, {
	timeout: 120000,
	polling: 5000,
	throwErrors: false,
});

const store = async function (searchWords) {
	const options = {
		headless: false,
		slowMo: 40,
		defaultViewport: {
			width: 1200,
			height: 1200,
		},
		devtools: true,
	};

	var browser = await puppeteer.launch(options);
	const [page] = await browser.pages();
	const cdp = await page.target().createCDPSession();

	try {
		await page.goto(
			"https://www.walmart.ca/blocked?url=L3NlYXJjaD9xPU5lc3RlYQ==&uuid=79958650-b793-11eb-bb7a-871342c18e88&vid=&g=a",
		);
	} catch (e) {
		console.log(e);
	}

	const captchaParams = await page.evaluate(() => {
		const findRecaptchaClients = () => {
			// eslint-disable-next-line camelcase
			if (typeof ___grecaptcha_cfg !== "undefined") {
				// eslint-disable-next-line camelcase, no-undef
				return Object.entries(___grecaptcha_cfg.clients).map(([cid, client]) => {
					const data = { id: cid, version: cid >= 10000 ? "V3" : "V2" };
					const objects = Object.entries(client).filter(
						([_, value]) => value && typeof value === "object",
					);

					objects.forEach(([toplevelKey, toplevel]) => {
						const found = Object.entries(toplevel).find(
							([_, value]) =>
								value &&
								typeof value === "object" &&
								"sitekey" in value &&
								"size" in value,
						);

						if (
							typeof toplevel === "object" &&
							toplevel instanceof HTMLElement &&
							toplevel["tagName"] === "DIV"
						) {
							data.pageurl = toplevel.baseURI;
						}

						if (found) {
							const [sublevelKey, sublevel] = found;

							data.sitekey = sublevel.sitekey;
							const callbackKey =
								data.version === "V2" ? "callback" : "promise-callback";
							const callback = sublevel[callbackKey];
							if (!callback) {
								data.callback = null;
								data.function = null;
							} else {
								data.function = callback;
								const keys = [cid, toplevelKey, sublevelKey, callbackKey]
									.map(key => `['${key}']`)
									.join("");
								data.callback = `___grecaptcha_cfg.clients${keys}`;
							}
						}
					});
					return data;
				});
			}
			return [];
		};
		return findRecaptchaClients();
	});
	// console.log("captchaParams:", captchaParams);

	let captcha = await client.decodeRecaptchaV2({
		googlekey: captchaParams[0].sitekey,
		pageurl: captchaParams[0].pageurl,
	});

	// console.log("captcha", captcha);

	await cdp.send("Runtime.evaluate", {
		expression: `${captchaParams[0].function}('${captcha._text}')`,
	});

	await page.goto(`https://www.walmart.ca/search?q=${searchWords}`, {
		waitUntil: "networkidle2",
	});

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
				`#product-results > div:nth-child(${j}) > div > a > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > p`,
			).innerText;

			// const title = grocItem.substr(0, grocItem.indexOf("|"));

			const price = document.querySelector(
				`#product-results > div:nth-child(${j}) > div > a > div:nth-child(1) > div:nth-child(2) > div:nth-child(3) > div:nth-child(1) > div > span > span`,
			).innerText;

			// const capacity = grocItem.substr(grocItem.indexOf("|") + 2);
			const capacity = document.querySelector(
				`#product-results > div:nth-child(${j}) > div > a > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(2) > p`,
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

	await page.close();
	await browser.close();
	return result;
};

module.exports = { store };
