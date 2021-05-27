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

	let result = await page.evaluate(async () => {
		let topResults = [];

		for (var i = 1; i < 7; i++) {
			const path = `ul[class="products-gallery js-quickview-wrapper"] > li:nth-child(${i})`;
			if (!document.querySelector(path)) {
				break;
			}
			const productID = document.querySelector(`${path}`).getAttribute("data-sku");
			const image = document.querySelector(`${path} img`).getAttribute("src");

			const title = document.querySelector(
				`${path}  > div > div > a > strong`,
			).innerText;

			const price = document.querySelector(
				`${path} span[class="cart_reader"]`,
			).innerText;

			const m = document.querySelector(
				`${path} > div > div > div.product-card__bottom-content > span.product-card__price + span`,
			).innerText;

			const capacity = m.substr(m.indexOf("/") + 2);

			//function to get the capacity of each item as a number
			const val = C => {
				var capacity = C.toLowerCase();
				var value;

				if (capacity.includes("x")) {
					capacity = capacity.split("x")[1];
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
					capacity = capacity.split("x")[0];
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

			const unitMass = value * quantity > 100 ? 100 : 1;
			const unitCost = (
				parseFloat(price.slice(1)) /
				((value * quantity) / unitMass)
			).toFixed(2);

			const findUnit = str => {
				// const unitString = str.split("x")[1];
				// let newStr = unitString.replace(/[0-9]/g, "");
				// return newStr;
				if (
					str.includes("ml") ||
					str.includes("mL") ||
					str.includes("L") ||
					str.includes("l")
				) {
					return "ml";
				} else if (str.includes("kg") || str.includes("g")) {
					return "g";
				} else {
					return "each";
				}
			};

			let titleCase = str => {
				const newString = [];
				let space = true;
				let char;
				str.split("");
				for (let i = 0; i < str.length; i++) {
					char = str[i];
					if (space) {
						newString.push(char);
					} else {
						newString.push(char.toLowerCase());
					}
					space = char === " " ? true : false;
				}
				return newString.join("");
			};

			topResults.push({
				store: "Longo's",
				productID: productID,
				image: image,
				title: titleCase(title),
				price: price,
				capacity: capacity,
				value: value,
				quantity: quantity,
				unitPrice: {
					cost: parseFloat(unitCost),
					mass: unitMass,
					units: findUnit(capacity),
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
