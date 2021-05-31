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

			const quantity = qty(capacity);
			const value = val(capacity);

			const unitMass = value * quantity > 100 ? 100 : 1;
			const unitCost = (
				parseFloat(price.slice(1)) /
				((value * quantity) / unitMass)
			).toFixed(2);

			const findUnit = str => {
				const unitsStr = str
					.slice(0)
					.toLowerCase()
					.split(" ")
					.find(text => {
						console.log("text", text);
						let textNoNums = text.replace(/[0-9]/g, "");
						console.log("textNoNums", textNoNums);
						return (
							textNoNums === "ml" ||
							textNoNums === "l" ||
							textNoNums === "kg" ||
							textNoNums === "g" ||
							textNoNums === "lb" ||
							textNoNums === "oz"
						);
					});

				if (unitsStr) {
					units = unitsStr.replace(/[0-9]/g, "");
					return units === "ml" || units === "l"
						? "ml"
						: units === "kg" || units === "g"
						? "g"
						: units === "lb" || units === "oz"
						? "oz"
						: "each";
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
