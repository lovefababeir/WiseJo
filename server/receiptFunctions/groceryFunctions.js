const walmartReceipt = receiptResults => {
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
const longosReceipt = receiptResults => {
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
const nofrillsReceipt = receiptResults => {
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
	walmartReceipt,
	longosReceipt,
	nofrillsReceipt,
};
