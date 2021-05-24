const receipt = receiptResults => {
	//To get store ID
	const storeIDindex = receiptResults.findIndex(text => {
		return text.includes("STORE") || text.includes("STO") || text.includes("ORE");
	});

	const storeID = receiptResults[storeIDindex].split(" ").pop();

	//To get address
	const address =
		receiptResults[storeIDindex + 1] +
		" " +
		receiptResults[storeIDindex + 2] +
		" " +
		receiptResults[storeIDindex + 3];

	//To get the number
	const contact = receiptResults[storeIDindex + 4];
	//To index of where List of items starts
	const itemsIndex =
		receiptResults.findIndex(text => {
			return text.includes("-");
		}) > -1
			? receiptResults.findIndex(text => {
					return text.includes("-");
			  }) + 2
			: receiptResults.findIndex(text => {
					return text.includes("$");
			  });

	const testAmount = amount => {
		const digits = amount.split("");
		const numDigits = amount.length;
		const decimalIndex = digits.indexOf(".");
		if (decimalIndex + 1 > 0) {
			if (numDigits - decimalIndex === 3) {
				return digits.join("");
			} else {
				digits.push("0", "0");

				digits.splice(decimalIndex + 3);
				return digits.join("");
			}
		} else {
			digits.splice(numDigits - 2, 0, ".");
			return digits.join("");
		}
	};
	//SUBTOTAL
	const subtotalIndex = receiptResults.findIndex(line => {
		return line.includes("SUBTOTAL") || line.includes("SUB");
	});

	const subtotalStr = receiptResults[subtotalIndex];
	const subtotal = Number(testAmount(subtotalStr.replace(/[^0-9.-]+/g, "")));

	//LIST OF ITEMS PURCHASED
	const purchases = receiptResults.slice(itemsIndex, subtotalIndex);

	//TOTAL
	const withTotal = receiptResults.slice(subtotalIndex + 1);
	const totalIndex = withTotal.findIndex(text => {
		return text.includes("TOTAL") || text.includes("TAL");
	});

	// const totalStr = withTotal[totalIndex];
	const total = Number(
		testAmount(withTotal[totalIndex]).replace(/[^0-9.-]+/g, ""),
	);

	const storeData = {
		storeID: storeID,
		address: address,
		contact: contact,
		purchases: purchases,
		subtotal: subtotal,
		total: total,
	};

	return storeData;
};

module.exports = { receipt };
