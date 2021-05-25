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
		return line.includes("SUBTOTAL");
	});

	//Change Index
	const changeIndex =
		receiptResults.findIndex(line => {
			return line.includes("DEBIT") || line.includes("TEND");
		}) +
			1 >
		0
			? receiptResults.findIndex(line => {
					return (
						line.includes("DEBIT") || line.includes("TEND") || line.includes("MCARD")
					);
			  }) + 1
			: receiptResults.findIndex(line => {
					return line.includes("CHANGE");
			  });

	//LIST OF ITEMS PURCHASED
	const purchases = receiptResults.slice(itemsIndex, subtotalIndex);

	//SUBTOTAL SUMMARY
	const purchaseSummary = receiptResults.slice(subtotalIndex, changeIndex + 1);

	const subtotalStr = purchaseSummary.reduce((subtotal, line) => {
		return line.includes("SUBTOTAL") || line.includes("SUB") ? line : subtotal;
	});
	const subtotal = Number(testAmount(subtotalStr.replace(/[^0-9.-]+/g, "")));

	//TOTAL
	const totalStr = purchaseSummary.reduce((total, line) => {
		return !line.includes("SUBTOTAL") &&
			!line.includes("SUB") &&
			(line.includes("TOTAL") || line.includes("TOT"))
			? line
			: total;
	});

	const total = Number(testAmount(totalStr.replace(/[^0-9.-]+/g, "")));

	const storeData = {
		storeID: storeID,
		address: address,
		contact: contact,
		purchases: purchases,
		purchaseSummary: purchaseSummary,
		subtotal: subtotal,
		total: total,
	};

	return storeData;
};

module.exports = { receipt };
