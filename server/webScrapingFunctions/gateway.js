const puppeteer = require("puppeteer");

const store = async function (searchWords) {
	const options = { headless: true };
	var browser = await puppeteer.launch(options);
	var page = await browser.newPage();
	await page.setDefaultTimeout(120000);
	await page.setViewport({ height: 1200, width: 960 });
	await page.goto(
		`https://www.grocerygateway.com/store/groceryGateway/en/search/?text=${searchWords}`,
		{
			waitUntil: "networkidle2",
		},
	);

	// const searchGateway = "#js-site-search-input";
	// await page.type(searchGateway, searchWords, {
	// 	delay: 100,
	// });
	// await page.keyboard.press("Enter");
	// await page.reload();

	let result = await page.evaluate(async () => {
		let topResults = [];

		for (var i = 1; i < 7; i++) {
			const path = `ul[class="products-gallery js-quickview-wrapper"] > li:nth-child(${i})`;
			if (!document.querySelector(path)) {
				break;
			}
			const productID = document.querySelector(`${path}`).getAttribute("data-sku");
			const image = document.querySelector(`${path} img`).getAttribute("src");

			const title = document.querySelector(`${path}  > div > div > a > strong`)
				.innerText;
			const price = document.querySelector(`${path} span[class="cart_reader"]`)
				.innerText;

			const m = document.querySelector(
				`${path} > div > div > div.product-card__bottom-content > span.product-card__price + span`,
			).innerText;

			const capacity = m.substr(m.indexOf("/") + 2);

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
					capacity.includes("count")
					// capacity.includes("ea")
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
				store: "Longo's",
				productID: productID,
				image: image,
				title: title,
				price: price,
				capacity: capacity,
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
