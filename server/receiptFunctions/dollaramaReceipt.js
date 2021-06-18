const receipt = receiptResults => {
	//=====Store location and contact details:

	const addressIndex =
		receiptResults.findIndex(line => {
			return line.includes("DOLLARAMA");
		}) + 1;

	const address = addressIndex
		? receiptResults[addressIndex] + " " + receiptResults[addressIndex + 1]
		: "";

	const contactIndex = receiptResults.findIndex(line => {
		return line.includes("-");
	});

	const contact =
		contactIndex < 6 && contactIndex !== -1 ? receiptResults[contactIndex] : "";

	//======================================
	//LIST OF ITEMS
	//To find the index of where List of items starts
	const hstIndex = receiptResults.findIndex(line => {
		return line.includes("HST");
	});

	const firstItemIndex =
		hstIndex - 1 === contactIndex ? contactIndex + 2 : hstIndex + 1;

	const subtotalIndex = receiptResults.findIndex(line => {
		return (
			line.includes("SUBTOTAL") ||
			line.includes("$") ||
			(line.includes("SUB") && line.includes("$"))
		);
	});

	let itemsList;
	if (firstItemIndex > 3 && subtotalIndex + 1 > 0) {
		itemsList = receiptResults.slice(firstItemIndex, subtotalIndex);
	} else {
		const totalIndex = receiptResults.findIndex(line => {
			return line.includes("TOTAL") && !line.includes("SUB");
		});
		itemsList = receiptResults.slice(4, totalIndex);
	}

	//======================================
	//Correcting Money Amount
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
	//SUBTOTAL
	let subtotal;
	const subtotalLine = receiptResults[subtotalIndex]?.split(" ");

	if (subtotalLine?.length > 0) {
		const subtotalStr = subtotalLine.pop();
		subtotal =
			(subtotalStr && testAmount(subtotalStr.replace(/[^0-9.]+/g, ""))) || "";
	}

	//======================================
	//TOTAL
	let total;
	let totalStr = receiptResults
		.find(line => {
			return line.includes("TOTAL") && !line.includes("SUB");
		})
		?.split(" ")
		?.pop();

	if (!totalStr) {
		const hst13 = receiptResults.findIndex(line => {
			return line.includes("13%");
		});
		totalStr =
			subtotalIndex + 1 > 0
				? receiptResults[subtotalIndex + 1].split(" ").pop()
				: receiptResults[hst13 + 1].split(" ").pop();
	}

	const paymentLine = receiptResults.find(line => {
		return (
			line.includes("DEBIT ") ||
			line.includes("Master Card") ||
			line.includes("CREDIT") ||
			line.includes("VISA")
		);
	});

	const totalNum = totalStr?.replace(/[^0-9.]+/g, "");

	const paymentNum = paymentLine?.replace(/[^0-9.-]+/g, "");

	let theTotal;
	if (totalNum && !paymentNum) {
		theTotal = totalNum;
	} else if (!totalNum && paymentNum) {
		theTotal = paymenNum;
	} else if (totalStr && paymentLine && totalNum !== paymentNum) {
		theTotal =
			totalNum.includes(paymentNum) || totalNum.length > paymentNum.length
				? totalNum
				: paymentNum;
	} else {
		theTotal = testAmount(totalNum);
	}
	total = testAmount(theTotal);

	const purchaseData = {
		address: address || "",
		contact: contact || "",
		purchases: itemsList || "",
		subtotal: subtotal || "",
		total: total || "",
	};

	return purchaseData;
};

module.exports = { receipt };
