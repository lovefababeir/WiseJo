const puppeteer = require("puppeteer");

const gateway = async function (searchWords) {
	const options = { headless: true };
	var browser = await puppeteer.launch(options);
	var page = await browser.newPage();
	await page.setViewport({ height: 1200, width: 960 });
	await page.goto("https://www.grocerygateway.com/store/", {
		waitUntil: "networkidle2",
	});

	const searchGateway = "#js-site-search-input";
	await page.type(searchGateway, searchWords, {
		delay: 100,
	});
	await page.keyboard.press("Enter");
	await page.reload();

	let result = await page.evaluate(async () => {
		let topResults = [];

		for (var i = 1; i < 7; i++) {
			const productID = document
				.querySelector(
					`ul[class="products-gallery js-quickview-wrapper"]> :nth-child(${i})`,
				)
				.getAttribute("data-sku");
			const image = document
				.querySelector(
					`ul[class="products-gallery js-quickview-wrapper"]> :nth-child(${i}) img`,
				)
				.getAttribute("src");

			const title = document.querySelector(
				`ul[class="products-gallery js-quickview-wrapper"]> :nth-child(${i}) a[class="product-card__name ellipsis"]>strong`,
			).innerText;
			const price = document.querySelector(
				`ul[class="products-gallery js-quickview-wrapper"]> :nth-child(${i}) span[class="cart_reader"]`,
			).innerText;

			const m = document.querySelector(
				`ul[class="products-gallery js-quickview-wrapper"] > li:nth-child(${i}) > div > div > div.product-card__bottom-content > span.product-card__price + span`,
			).innerText;

			const capacity = m.substr(m.indexOf("/") + 2);

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

const walmart = async function (searchWords) {
	const options = { headless: false };
	var browser = await puppeteer.launch(options);
	var page = await browser.newPage();
	await page.setViewport({ height: 1200, width: 960 });

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

const nofrills = async function (searchWords) {
	const options = { headless: false };
	var browser = await puppeteer.launch(options);
	var page = await browser.newPage();
	await page.setViewport({ height: 1200, width: 960 });
	await page.goto(`https://www.nofrills.ca/search?search-bar=${searchWords}`, {
		waitUntil: "networkidle2",
	});

	let result = await page.evaluate(() => {
		let topResults = [];

		for (var n = 1; n < 7; n++) {
			const productID = document
				.querySelector(
					`#site-content > div > div > div > div.with-tab-view > div > div.product-grid__results > div.product-grid__results__products > div > ul > li:nth-child(${n}) > div`,
				)
				.getAttribute("data-track-article-number");

			const image = document
				.querySelector(
					`#site-content > div > div > div > div.with-tab-view > div > div.product-grid__results > div.product-grid__results__products > div > ul > li:nth-child(${n}) > div > div > div.product-tile__thumbnail > div.product-tile__thumbnail__image > img`,
				)
				.getAttribute("src");

			const title =
				document.querySelector(
					`#site-content > div > div > div > div.with-tab-view > div > div.product-grid__results > div.product-grid__results__products > div > ul > li:nth-child(${n}) > div > div > div.product-tile__details > div.product-tile__details__info > h3 > a > span > span.product-name__item.product-name__item--brand`,
				).innerText +
				" " +
				document.querySelector(
					`#site-content > div > div > div > div.with-tab-view > div > div.product-grid__results > div.product-grid__results__products > div > ul > li:nth-child(${n}) > div > div > div.product-tile__details > div.product-tile__details__info > h3 > a > span > span.product-name__item.product-name__item--name`,
				).innerText;

			const price = document.querySelector(
				`#site-content > div > div > div > div.with-tab-view > div > div.product-grid__results > div.product-grid__results__products > div > ul > li:nth-child(${n}) > div > div > div.product-tile__details > div.product-prices.product-prices--product-tile.product-prices--product-tile > ul > li:nth-child(1) > span > span.price__value.selling-price-list__item__price.selling-price-list__item__price--now-price__value`,
			).innerHTML;

			const capacity = document.querySelector(
				`#site-content > div > div > div > div.with-tab-view > div > div.product-grid__results > div.product-grid__results__products > div > ul > li:nth-child(${n}) > div > div > div.product-tile__details > div.product-tile__details__info > h3 > a > span > span.product-name__item.product-name__item--package-size`,
			).innerText;

			//function to get the capacity of each item as a number
			const val = C => {
				var capacity = C.toLowerCase();
				var value;

				if (capacity.includes("x")) {
					capacity = capacity.split("x").find(str => {
						return str.includes("l") || str.includes("g");
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

			const quantity = qty(capacity);
			const value = val(capacity);

			topResults.push({
				store: "No Frills",
				productID: productID || "n/a",
				image: image || "n/a",
				title: title || "n/a",
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

const walmartStore = receiptResults => {
	//To get store ID
	const storeIDindex = receiptResults.findIndex(text => {
		return text.includes("STORE");
	});
	const storeID = receiptResults[storeIDindex].split(" ")[1];

	//To get address
	const address =
		receiptResults[storeIDindex + 1] +
		" " +
		receiptResults[storeIDindex + 2] +
		" " +
		receiptResults[storeIDindex + 3];

	//To index of where List of items starts
	const afterAddress = receiptResults.slice(storeIDindex + 4);
	const itemsIndex =
		afterAddress.findIndex(text => {
			return text.includes("ST");
		}) + 1;

	//SUBTOTAL
	const subtotalIndex = afterAddress.findIndex(text => {
		return text.includes("SUBTOTAL") || text.includes("SUB");
	});
	const subtotalStr = afterAddress[subtotalIndex];
	const subtotal = Number(subtotalStr.replace(/[^0-9.-]+/g, ""));

	//LIST OF ITEMS PURCHASED
	const purchases = afterAddress.slice(itemsIndex, subtotalIndex);

	//TOTAL
	const withTotal = afterAddress.slice(subtotalIndex + 1);
	const totalIndex = withTotal.findIndex(text => {
		return text.includes("TOTAL") || text.includes("TAL");
	});

	// const totalStr = withTotal[totalIndex];
	const total = Number(withTotal[totalIndex].replace(/[^0-9.-]+/g, ""));

	const storeData = {
		storeID: storeID,
		address: address,
		purchases: purchases,
		subtotal: subtotal,
		total: total,
	};

	return storeData;
};

//still need to write code based on receipts
const longosStore = receiptResults => {
	// const storeIDindex = receiptResults.findIndex(text => {
	// 	return text.includes("STORE");
	// });
	// const storeID = receiptResults[storeIDindex].split(" ")[1];
	// const address =
	// 	receiptResults[storeIDindex + 1] +
	// 	" " +
	// 	receiptResults[storeIDindex + 2] +
	// 	" " +
	// 	receiptResults[storeIDindex + 3];

	// const storeData = { storeID: storeID, address: address };

	return storeData;
};

//still need to write code based on receipts
const nofrillsStore = receiptResults => {
	// const storeIDindex = receiptResults.findIndex(text => {
	// 	return text.includes("STORE");
	// });
	// const storeID = receiptResults[storeIDindex].split(" ")[1];
	// const address =
	// 	receiptResults[storeIDindex + 1] +
	// 	" " +
	// 	receiptResults[storeIDindex + 2] +
	// 	" " +
	// 	receiptResults[storeIDindex + 3];

	// const storeData = { storeID: storeID, address: address };

	return storeData;
};

module.exports = {
	gateway,
	walmart,
	nofrills,
	walmartStore,
	longosStore,
	nofrillsStore,
};
