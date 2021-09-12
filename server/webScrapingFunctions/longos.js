const puppeteer = require("puppeteer");

const store = async function (searchWords) {
	const args = [
		"--no-sandbox",
		"--disable-web-security",
		"--disable-setuid-sandbox",
	];
	const options = { args, headless: true };
	var browser = await puppeteer.launch(options);
	var page = await browser.newPage();
	await page.setDefaultTimeout(30000);
	await page.setViewport({ height: 1200, width: 960 });
	await page.goto(
		`https://www.longos.com/search/${searchWords}?q=${searchWords}`,
		{
			waitUntil: "networkidle2",
		},
	);

	let result = await page.evaluate(async () => {
		let topResults = [];

		for (var i = 1; i < 9; i++) {
			const path = `body > gg-root > ion-content > cx-storefront > main > cx-page-layout > cx-page-slot.SearchResultsListSlot.has-components > gg-product-list > div > div.row > div:nth-child(${i})`;

			if (!document.querySelector(path)) {
				break;
			}
			const productID = document
				.querySelector(
					`${path} > gg-product-list-item > div > div.product-list-item_img-holder.text-center > a`,
				)
				?.getAttribute("href")
				.split("/")[2];

			const image = document.querySelector(`${path} img`)?.getAttribute("src");

			const title = document.querySelector(`${path}  h5.card-title`)?.innerText;

			const priceInnerText = document.querySelector(
				`${path} strong.price`,
			)?.innerText;
			const price = priceInnerText.slice(0, -2) + "." + priceInnerText.slice(-2);

			const capacity = document
				.querySelector(`${path} sub.unit`)
				?.innerText.split("/")[1];

			// const capacity = m && m.substr(m.indexOf("/") + 2);

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

			const findUnit = str => {
				if (!str) {
					return "";
				}
				const unitsStr = str
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
							textNoNums === "lb" ||
							textNoNums === "oz"
						);
					});

				if (unitsStr) {
					units = unitsStr.replace(/[^a-zA-Z ]/g, "");
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

			const unitMass = value * quantity < 70 ? 1 : 100;
			const unitCost =
				(price &&
					value &&
					quantity &&
					parseFloat(
						parseFloat(price.slice(1) / ((value * quantity) / unitMass)).toFixed(2),
					)) ||
				"";

			let titleCase = str => {
				if (!str) {
					return "";
				}
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
					cost: unitCost,
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
