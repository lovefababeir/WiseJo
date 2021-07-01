const receipt = receiptResults => {
	//To get store ID
	const storeIDindex = receiptResults.findIndex(text => {
		return text.includes("STORE") || text.includes("STO") || text.includes("ORE");
	});

	const contactIndex = receiptResults.findIndex(line => {
		return line.includes("-");
	});
	const storeID = receiptResults[storeIDindex]?.split(" ").pop();

	let address =
		storeIDindex + 1 > 0 &&
		storeIDindex < contactIndex &&
		contactIndex - storeIDindex < 5
			? receiptResults.slice(storeIDindex + 1, contactIndex).join(" ")
			: receiptResults.slice(storeIDindex + 1, storeIndex + 4).join(" ") ||
			  receiptResults.slice(contactIndex - 3, contactIndex).join(" ");
	let contact = contactIndex ? receiptResults[contactIndex] : "";

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
				return parseFloat(digits.join("")).toFixed(2);
			} else {
				return parseFloat(digits).toFixed(2);
			}
		} else {
			digits.splice(numDigits - 2, 0, ".");
			return parseFloat(digits.join("")).toFixed(2);
		}
	};

	//======================================
	//Index of the last item
	const lastItemIndex =
		receiptResults.findIndex(line => {
			return (
				line.includes("SUBTOTAL") ||
				line.includes("SUBTOT") ||
				line.includes("BTOTAL")
			);
		}) - 1;

	const hstIndex = receiptResults.findIndex(line => {
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
	const subtotalIndex = receiptResults.reduce((subtotalIndex, line, i) => {
		return line.includes("SUBTOTAL") || line.includes("SUB") ? i : subtotalIndex;
	});
	const subtotalLine =
		subtotalIndex + 1 === hstIndex
			? receiptResults[subtotalIndex]
			: receiptResults[hstIndex - 1];
	const subtotal = testAmount(subtotalLine?.replace(/[^0-9.]+/g, ""));

	//======================================
	//TOTAL
	const totalStr = receiptResults.reduce((total, line) => {
		return !line.includes("SUBTOTAL") &&
			!line.includes("SUB") &&
			(line.includes("TOTAL") ||
				line.includes("TOT") ||
				line.includes("TOTA") ||
				line.includes("OTAL"))
			? line
			: total;
	});
	const paymentLine = receiptResults.find(line => {
		return (
			line.includes("DEBIT") ||
			line.includes("VISA TEND") ||
			line.includes("TEND") ||
			line.includes("MCARD") ||
			line.includes("CARD") ||
			line.includes("VISA ")
		);
	});

	let total;
	const totalNum = totalStr?.replace(/[^0-9.]+/g, "");
	const paymentNum = paymentLine?.replace(/[^0-9.]+/g, "");

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
		storeID: storeID ? `ST# ${storeID}` : "",
		address: address,
		contact: contact,
		purchases: purchases,
		subtotal: subtotal,
		total: total,
	};

	return purchaseData;
};

module.exports = { receipt };
