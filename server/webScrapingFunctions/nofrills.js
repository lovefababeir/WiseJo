const puppeteer = require("puppeteer");

const store = async function (searchWords) {
	const options = { headless: true };
	var browser = await puppeteer.launch(options);
	var page = await browser.newPage();
	await page.setDefaultTimeout(120000);
	await page.setViewport({ height: 1200, width: 960 });

	await page.goto(`https://www.nofrills.ca/`);
	await page.waitForSelector(
		"#site-layout > div.modal-dialog.modal-dialog--region-selector > div.modal-dialog__content > div > div > ul > li:nth-child(7) > button",
	);
	await page.click(
		"#site-layout > div.modal-dialog.modal-dialog--region-selector > div.modal-dialog__content > div > div > ul > li:nth-child(7) > button",
	);
	await page.goto(`https://www.nofrills.ca/search?search-bar=${searchWords}`, {
		waitUntil: "networkidle2",
	});

	let result = await page.evaluate(() => {
		let topResults = [];

		for (var n = 1; n < 7; n++) {
			let path = `#site-content > div > div > div > div.with-tab-view > div > div.product-grid__results > div.product-grid__results__products > div > ul > li:nth-child(${n})`;

			if (!document.querySelector(path)) {
				break;
			}

			const productID = document
				.querySelector(`${path} > div`)
				.getAttribute("data-track-article-number");

			const image = document
				.querySelector(
					`${path} > div > div > div.product-tile__thumbnail > div.product-tile__thumbnail__image > img`,
				)
				.getAttribute("src");

			var title1 = document.querySelector(
				`${path} > div > div > div.product-tile__details > div.product-tile__details__info > h3 > a > span > span:nth-child(1)`,
			).innerText;
			var title2 = document.querySelector(
				`${path} > div > div > div.product-tile__details > div.product-tile__details__info > h3 > a > span > span:nth-child(2)`,
			);
			title2 = title2 ? title2.innerText : "";
			const title = title1 + " " + title2;

			const price = document.querySelector(
				`${path} > div > div > div.product-tile__details > div.product-tile__details__info > div > div.product-prices > ul:nth-child(1) > li:nth-child(1) > span > span:nth-child(1)`,
			).innerHTML;

			var size = document.querySelector(
				`${path} > div > div > div.product-tile__details > div.product-tile__details__info > h3 > a > span > span.product-name__item.product-name__item--package-size`,
			);
			size = size ? size.innerText : "est. each";

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
						return !str.includes("l") && !str.includes("g");
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

			const unitCost = document.querySelector(
				`${path} > div > div > div.product-tile__details > div.product-tile__details__info > div > div.product-prices > ul:nth-child(2) > li:nth-child(1) > span > span:nth-child(1)`,
			)
				? document.querySelector(
						`${path} > div > div > div.product-tile__details > div.product-tile__details__info > div > div.product-prices > ul:nth-child(2) > li:nth-child(1) > span > span:nth-child(1)`,
				  ).innerText
				: "";
			const unitMass = document.querySelector(
				`${path} > div > div > div.product-tile__details > div.product-tile__details__info > div > div.product-prices > ul:nth-child(2) > li:nth-child(1) > span > span:nth-child(2)`,
			)
				? document
						.querySelector(
							`${path} > div > div > div.product-tile__details > div.product-tile__details__info > div > div.product-prices > ul:nth-child(2) > li:nth-child(1) > span > span:nth-child(2)`,
						)
						.innerText.split("/ ")[1]
				: "";

			var quantity = "";
			var value = "";
			if (size === "est. each") {
				quantity = 1;
				value = 1;
			} else {
				quantity = qty(size);
				value = val(size);
			}

			const findUnit = str => {
				let newStr = str.replace(/[0-9]/g, "");
				return newStr;
			};

			topResults.push({
				store: "No Frills",
				productID: productID || "n/a",
				image: image || "n/a",
				title: title || "n/a",
				price: price || "n/a",
				capacity: size || "n/a",
				value: value,
				quantity: quantity,
				unitPrice: {
					cost: parseFloat(unitCost),
					mass: parseFloat(unitMass),
					units: findUnit(unitMass),
				},
			});
		}
		return topResults;
	});

	return result;
	await page.waitFor(2000);
	await page.close();
	await browser.close();
};

module.exports = { store };
