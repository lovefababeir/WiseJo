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
			const path = `#main > div:nth-child(2) > div > div > div.Col-sc-3u3i8h-0.hrgMkx > div > div > div:nth-child(${i})`;

			if (!document.querySelector(path)) {
				break;
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

			const findUnit = str => {
				let newStr = str.replace(/[0-9]/g, "").split("");
				newStr.pop();
				return newStr.join("");
			};

			topResults.push({
				store: "Sobeys",
				productID: productID,
				image: image,
				title: title,
				price: price,
				capacity: capacity,
				value: value,
				quantity: quantity,
				unitPrice: {
					cost: parseFloat(unitCost.slice(2)),
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
