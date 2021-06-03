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
				`${path} > div > div > div.product-tile__details > div.product-tile__details__info > div > div.product-prices > div > div > span > span.price__value`,
			).innerHTML;

			var size = document.querySelector(
				`${path} > div > div > div.product-tile__details > div.product-tile__details__info > h3 > a > span > span.product-name__item.product-name__item--package-size`,
			);
			size = size ? size.innerText : "est. each";

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

			//function to get the capacity of each item as a number
			const val = C => {
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
							word.replace(/[0-9]/g, "") === "kg" ||
							word.replace(/[0-9]/g, "") === "g" ||
							word.replace(/[0-9]/g, "") === "lb" ||
							word.replace(/[0-9]/g, "") === "oz" ||
							word.replace(/[0-9]/g, "") === "l" ||
							word.replace(/[0-9]/g, "") === "ml"
						);
					});

				const units = unitsString ? unitsString.replace(/[0-9]/g, "") : "";

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
				var capacity = C.toLowerCase();
				var qty;
				if (capacity.includes("x")) {
					return parseInt(capacity.split("x")[0]);
				}

				const qtyUnits = capacity.slice(0).replace(/[0-9]/g, "");

				if (
					qtyUnits
						.slice(0)
						.split(" ")
						.find(x => {
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
					qty = capacity.match(/\d+/g).map(Number)[0];
				}
				return qty;
			};

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
				productID: productID || "",
				image: image || "",
				title: title || "",
				price: price || "",
				capacity: size || "",
				value: value,
				quantity: quantity,
				unitPrice: {
					cost: parseFloat(unitCost.slice(1)),
					mass: parseFloat(unitMass),
					units: findUnit(unitMass),
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
