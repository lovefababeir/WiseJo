const puppeteer = require("puppeteer");

const store = async function (searchWords) {
	const args = ["--no-sandbox", "--disable-web-security"];
	const options = { args, headless: true };
	var browser = await puppeteer.launch(options);
	var page = await browser.newPage();
	await page.setDefaultTimeout(120000);
	await page.setViewport({ height: 1200, width: 960 });
	await page.goto(`https://www.loblaws.ca/search?search-bar=${searchWords}`, {
		waitUntil: "networkidle2",
	});

	let result = await page.evaluate(async () => {
		let topResults = [];

		for (var i = 1; i < 9; i++) {
			const path = `#site-content > div > div > div > div.with-tab-view > div > div.product-grid > div.product-grid__results > div.product-grid__results__products > div > ul > li:nth-child(${i})`;
			if (!document.querySelector(path)) {
				break;
			}
			const productID = document
				.querySelector(`${path} > div`)
				?.getAttribute("data-track-product-id");

			const image = document.querySelector(`${path} img`)?.getAttribute("src");

			const title = document.querySelector(
				`${path} > div > div > div.product-tile__details > div.product-tile__details__info > h3 > a > span > span.product-name__item.product-name__item--name`,
			)?.innerText;

			const price = document.querySelector(
				`${path} > div > div > div.product-tile__details > div.product-tile__details__info > div > div.product-prices.product-prices--product-tile > div > div > span > span:nth-child(1)`,
			)?.innerText;

			const capacity = document.querySelector(
				`${path} > div > div > div.product-tile__details > div.product-tile__details__info > h3 > a > span > span.product-name__item.product-name__item--package-size`,
			)?.innerText;

			const unitCost = document.querySelector(
				`${path} > div > div > div.product-tile__details > div.product-tile__details__info > div > div.product-prices.product-prices--product-tile > ul > li > span > span:nth-child(1)`,
			)?.innerText;

			const unitMass = document.querySelector(
				`${path} > div > div > div.product-tile__details > div.product-tile__details__info > div > div.product-prices.product-prices--product-tile > ul > li > span > span:nth-child(2)`,
			)?.innerText;

			//function to get the capacity of each item as a number
			const val = C => {
				if (!C) {
					return "";
				}
				var capacity = C.toLowerCase();
				var value;

				if (capacity.includes("x")) {
					capacity = capacity.split("x")[1];
				}

				const unitsString = capacity
					.slice(0)
					.split(" ")
					.find(word => {
						return (
							word.replace(/[^a-zA-Z ]/g, "") === "kg" ||
							word.replace(/[^a-zA-Z ]/g, "") === "g" ||
							word.replace(/[^a-zA-Z ]/g, "") === "lb" ||
							word.replace(/[^a-zA-Z ]/g, "") === "oz" ||
							word.replace(/[^a-zA-Z ]/g, "") === "l" ||
							word.replace(/[^a-zA-Z ]/g, "") === "ml"
						);
					});

				const units = unitsString ? unitsString.replace(/[^a-zA-Z ]/g, "") : "";
				if (units === "kg" || units === "l") {
					value = parseFloat(capacity) * 1000;
				} else if (units === "g" || units === "ml" || units === "oz") {
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
				if (capacity.includes("x")) {
					return parseInt(capacity.split("x")[0]);
				}
				const qtyUnits = capacity.slice(0).replace(/[^a-zA-Z ]/g, "");

				if (
					qtyUnits
						?.slice(0)
						?.split(" ")
						?.find(x => {
							return (
								x === "ml" ||
								x === "l" ||
								x === "g" ||
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

			const units = unitMass.replace(/[^a-zA-Z ]/g, "").split(" ")[1];

			topResults.push({
				store: "Loblaws",
				productID: productID,
				image: image,
				title: title,
				price: price,
				capacity: capacity,
				value: value,
				quantity: quantity,
				unitPrice: {
					cost: parseFloat(unitCost.slice(1)),
					mass: parseInt(unitMass.split("/ ")[1]),
					units: units,
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
