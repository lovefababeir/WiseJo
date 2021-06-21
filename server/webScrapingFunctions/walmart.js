const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
require("dotenv").config();
puppeteer.use(StealthPlugin());
const Client = require("@infosimples/node_two_captcha");

client = new Client(process.env.CAPTCHA_API_KEY, {
	timeout: 170000,
	polling: 5000,
	throwErrors: false,
});

const store = async function (searchWords) {
	const args = [
		'--user-agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3312.0 Safari/537.36"',
		"--no-sandbox",
		"--disable-web-security",
	];

	const options = {
		args,
		headless: true,
		slowMo: 40,
		defaultViewport: {
			width: 1200,
			height: 1200,
		},
		devtools: true,
	};

	var browser = await puppeteer.launch(options);
	const [page] = await browser.pages();
	await page.setDefaultTimeout(120000);
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

	let captcha = await client.decodeRecaptchaV2({
		googlekey: captchaParams[0].sitekey,
		pageurl: captchaParams[0].pageurl,
	});

	console.log(captcha);
	await cdp.send("Runtime.evaluate", {
		expression: `${captchaParams[0].function}('${captcha._text}')`,
	});

	await page.goto(`https://www.walmart.ca/search?q=${searchWords}&f=12&p=1`, {
		waitUntil: "networkidle2",
	});

	await page.waitForSelector("#product-results > div:nth-child(1)");

	let result = await page.evaluate(() => {
		let topResults = [];

		for (var j = 1; j < 9; j++) {
			const productID = document
				.querySelector(`#product-results > div:nth-child(${j}) > div`)
				?.getAttribute("data-product-id");

			const image =
				document
					.querySelector(
						`	#product-results > div:nth-child(${j}) img[data-automation="image"]`,
					)
					?.getAttribute("src") ||
				document
					.querySelector(
						`#product-results > div:nth-child(${j}) > div > a > div:nth-child(1) > div:nth-child(1) > img`,
					)
					?.getAttribute("src");

			const grocItem =
				document.querySelector(
					`	#product-results > div:nth-child(${j}) p[data-automation="name"]`,
				)?.innerText ||
				document.querySelector(
					`#product-results > div:nth-child(${j}) > div > a > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) p`,
				)?.innerText;

			const price =
				document.querySelector(
					`	#product-results > div:nth-child(${j}) span[data-automation="current-price"]`,
				)?.innerText ||
				document.querySelector(
					`#product-results > div:nth-child(${j}) > div > a > div:nth-child(1) > div:nth-child(2) > div:nth-child(3) > div:nth-child(1) > div > span > span`,
				)?.innerText;

			const capacity =
				document.querySelector(
					`	#product-results > div:nth-child(${j}) p[data-automation="description"]`,
				)?.innerText ||
				document.querySelector(
					`#product-results > div:nth-child(${j}) > div > a > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(2) > p`,
				)?.innerText;

			const unitPriceText =
				document.querySelector(
					`#product-results > div:nth-child(${j}) span[data-automation="price-per-unit"]`,
				)?.innerText || "";
			//function to get the capacity of each item as a number
			const val = C => {
				if (!C) {
					return "";
				}
				var capacity = C.toLowerCase();
				var value;
				if (capacity.includes("x") || capacity.includes(",")) {
					return capacity.includes("x")
						? parseFloat(capacity.slice(0).split("x")[1])
						: parseFloat(capacity.slice(0).split("x")[0]);
				}
				const unitsString = capacity
					.slice(0)
					.split(" ")
					.find(word => {
						return (
							word.replace(/[^a-zA-Z ]/g, "") === "kg" ||
							word.replace(/[^a-zA-Z ]/g, "") === "g" ||
							word.replace(/[^a-zA-Z ]/g, "") === "gm" ||
							word.replace(/[^a-zA-Z ]/g, "") === "lb" ||
							word.replace(/[^a-zA-Z ]/g, "") === "oz" ||
							word.replace(/[^a-zA-Z ]/g, "") === "l" ||
							word.replace(/[^a-zA-Z ]/g, "") === "ml"
						);
					});
				const units = unitsString?.replace(/[^a-zA-Z ]/g, "") || "";

				if (units === "kg" || units === "l") {
					value = parseFloat(capacity) * 1000;
				} else if (
					units === "g" ||
					units === "gm" ||
					units === "ml" ||
					units === "oz"
				) {
					value = parseInt(capacity);
				} else if (units === "lb") {
					value = parseFloat(capacity) * 16;
				} else {
					value = 1;
				}
				return value;
			};

			//function to get the quantity in item
			const qty = C => {
				if (!C) {
					return "";
				}
				var capacity = C.toLowerCase();
				var qty;
				const capacityWords = capacity.slice(0).split(" ");
				if (!capacity.includes("x") && capacity.includes(",")) {
					return parseInt(capacity.split(",")[1]);
				}

				if (capacity.includes("x")) {
					const xIndex = capacityWords.findIndex(word => {
						return word === "x";
					});
					//returns the item in the capacityWords array that is a number appearing right before the "x"
					return (
						parseInt(capacityWords[xIndex - 1]) || parseInt(capacityWords[xIndex - 2])
					);
				}
				const qtyUnits = capacity.slice(0).replace(/[^a-zA-Z ]/g, "");
				if (
					qtyUnits
						?.slice(0)
						.split(" ")
						.find(x => {
							return (
								x === "ml" ||
								x === "l" ||
								x === "g" ||
								x === "gm" ||
								x === "kg" ||
								x === "lb" ||
								x === "oz"
							);
						})
				) {
					qty = 1;
				} else {
					qty = capacity.match(/\d+/g)?.map(Number)[0] || 1;
				}
				return qty;
			};

			const quantity = qty(capacity);

			const value = val(capacity);
			const getCostFrom = str => {
				if (!str) {
					return "";
				}
				const costStr = str.slice(0).split("/")[0];
				if (costStr.includes("¢")) {
					return parseFloat(costStr) / 100;
				} else {
					return parseFloat(costStr.slice(1));
				}
			};

			const getMassFrom = str => {
				if (!str) {
					return "";
				}
				const massStr = str.slice(0).split("/")[1];
				return parseInt(massStr) || 1;
			};

			const getUnitsFrom = str => {
				if (!str) {
					return "";
				}
				const massStr = str.slice(0).split("/")[1];
				return massStr.replace(/[^a-zA-Z ]/g, "");
			};

			const calcCostValue = (costStr, value, quantity) => {
				if (!costStr || !value || !quantity) {
					return "";
				}
				return parseFloat(costStr.slice(1)) / (value * quantity);
			};

			const calcMassValue = capacity => {
				if (!capacity) {
					return "";
				}
				const unitsStr = capacity
					.slice(0)
					.toLowerCase()
					.split(" ")
					.find(text => {
						let textNoNums = text.replace(/[^a-zA-Z ]/g, "");
						return (
							textNoNums === "ml" ||
							textNoNums === "l" ||
							textNoNums === "kg" ||
							textNoNums === "g" ||
							textNoNums === "gm" ||
							textNoNums === "lb" ||
							textNoNums === "oz"
						);
					});

				if (unitsStr) {
					units = unitsStr.replace(/[^a-zA-Z ]/g, "");
					return units === "ml" || units === "l"
						? 100
						: units === "kg" || units === "g" || units === "gm"
						? 100
						: units === "lb" || units === "oz"
						? 1
						: 1;
				} else {
					return 1;
				}
			};

			const getUnitsFromCapacity = capacity => {
				if (!capacity) {
					return "";
				}
				const unitsStr = capacity
					.slice(0)
					.toLowerCase()
					.split(" ")
					.find(text => {
						let textNoNums = text.replace(/[^a-zA-Z ]/g, "");
						return (
							textNoNums === "ml" ||
							textNoNums === "l" ||
							textNoNums === "kg" ||
							textNoNums === "g" ||
							textNoNums === "gm" ||
							textNoNums === "lb" ||
							textNoNums === "oz"
						);
					});

				if (unitsStr) {
					units = unitsStr.replace(/[^a-zA-Z ]/g, "");
					return units === "ml" || units === "l"
						? "ml"
						: units === "kg" || units === "g" || units === "gm"
						? "g"
						: units === "lb" || units === "oz"
						? "oz"
						: "each";
				} else {
					return "each";
				}
			};

			topResults.push({
				store: "Walmart",
				productID: productID || "",
				image: image || "",
				title: grocItem || "",
				price: price || "",
				capacity: capacity || "",
				value: value || "",
				quantity: quantity || "",
				unitPrice: {
					cost: unitPriceText
						? getCostFrom(unitPriceText)
						: parseFloat(
								(
									calcCostValue(price, value, quantity) * calcMassValue(capacity)
								).toFixed(2),
						  ),
					mass: unitPriceText ? getMassFrom(unitPriceText) : calcMassValue(capacity),
					units: unitPriceText
						? getUnitsFrom(unitPriceText)
						: getUnitsFromCapacity(capacity),
				},
			});
		}
		return topResults;
	});

	await page.close();
	await browser.close();
	return result;
};

module.exports = { store };
