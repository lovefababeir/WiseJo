const receipt = receiptResults => {
	//To get store ID
	const storeIDindex = receiptResults.findIndex(text => {
		return text.includes("STORE") || text.includes("STO") || text.includes("ORE");
	});

	const storeID = receiptResults[storeIDindex]?.split(" ").pop();

	let address;
	let contact;
	//======================================s
	if (storeIDindex + 1 > 0) {
		//To get addres
		address =
			receiptResults[storeIDindex + 1] +
			" " +
			receiptResults[storeIDindex + 2] +
			" " +
			receiptResults[storeIDindex + 3];

		//To get the number
		contact = receiptResults[storeIDindex + 4];
	}

	//======================================
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
		if (!amount) {
			return;
		}
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

	//======================================
	//Index of the last item
	const lastItemIndex =
		receiptResults.findIndex(line => {
			return line.includes("SUBTOTAL");
		}) ||
		receiptResults.findIndex(line => {
			return line.includes("HST") || line.includes("13.0000%");
		});

	//======================================
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

	//======================================
	//LIST OF ITEMS PURCHASED
	const purchases = receiptResults.slice(itemsIndex, lastItemIndex);

	//======================================
	//SUBTOTAL
	const subtotalStr = receiptResults.reduce((subtotal, line) => {
		return line.includes("SUBTOTAL") || line.includes("SUB") ? line : subtotal;
	});
	const subtotal = testAmount(subtotalStr.replace(/[^0-9.-]+/g, ""));

	//======================================
	//TOTAL
	const totalStr = receiptResults.reduce((total, line) => {
		return !line.includes("SUBTOTAL") &&
			!line.includes("SUB") &&
			(line.includes("TOTAL") || line.includes("TOT"))
			? line
			: total;
	});
	const paymentLine = receiptResults.find(line => {
		return (
			line.includes("DEBIT") ||
			line.includes("TEND") ||
			line.includes("MCARD") ||
			line.includes("CARD")
		);
	});

	let total;
	const totalNum = totalStr.replace(/[^0-9.-]+/g, "");
	const paymentNum = paymentLine?.replace(/[^0-9.-]+/g, "");

	if (totalStr && paymentLine && totalNum !== paymentNum) {
		total =
			totalNum.includes(paymentNum) || totalNum.length > paymentNum.length
				? testAmount(totalNum)
				: testAmount(paymentNum);
	} else {
		total = testAmount(totalNum);
	}

	//Purchase Breakdown
	const purchaseData = {
		storeID: storeID,
		address: address,
		contact: contact,
		purchases: purchases,
		subtotal: subtotal,
		total: total,
	};

	return purchaseData;
};

module.exports = { receipt };
