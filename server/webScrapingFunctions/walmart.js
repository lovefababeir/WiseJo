const puppeteer = require("puppeteer");

const store = async function (searchWords) {
	const options = { headless: true };

	var browser = await puppeteer.launch(options);
	var page = await browser.newPage();
	await page.setDefaultTimeout(60000);
	await page.setViewport({ height: 1200, width: 960 });

	await page.setUserAgent(
		"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36",
	);

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
						return str.toLowerCase().includes("l") || str.toLowerCase().includes("g");
					});
				}

				if (capacity.includes("kg")) {
					value = capacity.match(/\d+/g).map(Number)[0] * 1000;
				} else if (capacity.includes("g") || capacity.includes("ml")) {
					value = capacity.match(/\d+/g).map(Number)[0];
					return value;
				} else if (capacity.includes("l")) {
					value = capacity.match(/\d+/g).map(Number)[0] * 1000;
				} else if (
					capacity.includes("pkg ") ||
					capacity.includes("pack") ||
					capacity.includes("cup") ||
					capacity.includes("cans") ||
					capacity.includes("count") ||
					capacity.includes("ea")
				) {
					value = 1;
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

module.exports = { store };
