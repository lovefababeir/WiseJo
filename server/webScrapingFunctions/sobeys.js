const puppeteer = require("puppeteer");

const store = async function (searchWords) {
	const options = { headless: true };
	var browser = await puppeteer.launch(options);
	var page = await browser.newPage();
	await page.setDefaultTimeout(120000);
	await page.setViewport({ height: 1200, width: 960 });
	await page.goto(`https://voila.ca/products/search?q=${searchWords}`, {
		waitUntil: "networkidle2",
	});

	let result = await page.evaluate(async () => {
		let topResults = [];

		for (var i = 1; i < 7; i++) {
			let path = `#main > div:nth-child(2) > div > div > div.Col-sc-3u3i8h-0.hrgMkx > div > div > div:nth-child(${i})`;

			if (!document.querySelector(path)) {
				break;
			}
			if (!document.querySelector(`${path} > div:nth-child(2)`)) {
				continue;
			}
			const productID = document
				.querySelector(
					`${path} > div.box__Box-sc-1i88g6n-0.base__BoxCard-sc-7vdzdx-5.cawmbv.ikFYmE > div.flex__Flex-sc-1gp968g-0.base__BodyContainer-sc-7vdzdx-28.kZQYJv.dQDdqx > div.base__Body-sc-7vdzdx-29.bOIIDq > h3 > a`,
				)
				.getAttribute("href")
				.split("/")[2];

			const image = document
				.querySelector(
					`${path} > div.box__Box-sc-1i88g6n-0.base__BoxCard-sc-7vdzdx-5.cawmbv.ikFYmE > div.base__Header-sc-7vdzdx-12.KaBIU > div > a > img`,
				)
				.getAttribute("src");

			const title = document.querySelector(
				`${path} > div.box__Box-sc-1i88g6n-0.base__BoxCard-sc-7vdzdx-5.cawmbv.ikFYmE > div.flex__Flex-sc-1gp968g-0.base__BodyContainer-sc-7vdzdx-28.kZQYJv.dQDdqx > div.base__Body-sc-7vdzdx-29.bOIIDq > h3 > a`,
			).innerText;

			const price = document.querySelector(
				`${path} > div.box__Box-sc-1i88g6n-0.base__BoxCard-sc-7vdzdx-5.cawmbv.ikFYmE > div.flex__Flex-sc-1gp968g-0.base__BodyContainer-sc-7vdzdx-28.kZQYJv.dQDdqx > div.base__Body-sc-7vdzdx-29.bOIIDq > div.base__PriceWrapper-sc-7vdzdx-23.iLTTFP > strong`,
			).innerText;

			const capacity = document.querySelector(
				`${path} > div.box__Box-sc-1i88g6n-0.base__BoxCard-sc-7vdzdx-5.cawmbv.ikFYmE > div.flex__Flex-sc-1gp968g-0.base__BodyContainer-sc-7vdzdx-28.kZQYJv.dQDdqx > div.base__Body-sc-7vdzdx-29.bOIIDq > div:nth-child(3) > div > span.text__Text-x7sj8-0.base__SizeText-sc-7vdzdx-34.gzMqij.fHaaeW`,
			).innerText;

			const unitCost = document.querySelector(
				`${path} > div.box__Box-sc-1i88g6n-0.base__BoxCard-sc-7vdzdx-5.cawmbv.ikFYmE > div.flex__Flex-sc-1gp968g-0.base__BodyContainer-sc-7vdzdx-28.kZQYJv.dQDdqx > div.base__Body-sc-7vdzdx-29.bOIIDq > div:nth-child(3) > div > span.text__Text-x7sj8-0.gVneWT`,
			)
				? document
						.querySelector(
							`${path} > div.box__Box-sc-1i88g6n-0.base__BoxCard-sc-7vdzdx-5.cawmbv.ikFYmE > div.flex__Flex-sc-1gp968g-0.base__BodyContainer-sc-7vdzdx-28.kZQYJv.dQDdqx > div.base__Body-sc-7vdzdx-29.bOIIDq > div:nth-child(3) > div > span.text__Text-x7sj8-0.gVneWT`,
						)
						.innerText.split(" ")[0]
				: "";
			const unitMass = document.querySelector(
				`${path} > div.box__Box-sc-1i88g6n-0.base__BoxCard-sc-7vdzdx-5.cawmbv.ikFYmE > div.flex__Flex-sc-1gp968g-0.base__BodyContainer-sc-7vdzdx-28.kZQYJv.dQDdqx > div.base__Body-sc-7vdzdx-29.bOIIDq > div:nth-child(3) > div > span.text__Text-x7sj8-0.gVneWT`,
			)
				? document
						.querySelector(
							`${path} > div.box__Box-sc-1i88g6n-0.base__BoxCard-sc-7vdzdx-5.cawmbv.ikFYmE > div.flex__Flex-sc-1gp968g-0.base__BodyContainer-sc-7vdzdx-28.kZQYJv.dQDdqx > div.base__Body-sc-7vdzdx-29.bOIIDq > div:nth-child(3) > div > span.text__Text-x7sj8-0.gVneWT`,
						)
						.innerText.split(" ")[2]
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

			const findUnit = str => {
				let newStr = str.replace(/[0-9]/g, "").split("");
				newStr.pop();
				return newStr.join("");
			};

			//Function is used to correct check the values given which is sometimes different from whats in the title on this website.
			const checkValue = (itemTitle, valueGiven, capacityGiven) => {
				const wordsInTitle = itemTitle.slice(0).split(" ");
				if (capacityGiven.includes("x")) {
					return valueGiven;
				}

				const valueinTitle = parseFloat(
					wordsInTitle.find(word => {
						return parseFloat(word);
					}),
				);

				return !valueinTitle ||
					valueinTitle === valueGiven ||
					valueinTitle * 1000 === valueGiven
					? valueGiven
					: capacityGiven.toLowerCase().includes("kg") ||
					  (!capacityGiven.toLowerCase().includes("ml") &&
							capacityGiven.toLowerCase().includes("l"))
					? valueinTitle * 1000
					: capacityGiven.toLowerCase().includes("g") ||
					  capacityGiven.toLowerCase().includes("ml")
					? valueinTitle
					: 1;
			};

			const quantity = qty(capacity);
			const value = val(capacity);

			topResults.push({
				store: "Sobeys",
				productID: productID,
				image: image,
				title: title,
				price: price,
				capacity: capacity,
				value: checkValue(title, value, capacity),
				quantity: quantity,
				unitPrice: {
					cost: parseFloat(unitCost.slice(2)),
					mass: parseFloat(unitMass) || 1,
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
