const receipt = receiptResults => {
	//=====Store location and contact details:

	const whyPayIndex = receiptResults.findIndex(line => {
		const text = line.toLowerCase();
		return text.includes("why pay") || text.includes("shop at");
	});
	const welcomeIndex = receiptResults.findIndex(line => {
		const text = line.toLowerCase();
		return (
			text.includes("welcome") || text.includes("welc") || text.includes("come #")
		);
	});

	const storeLocationIndex =
		whyPayIndex + 2 === welcomeIndex || whyPayIndex + 1 > 0
			? whyPayIndex + 1
			: welcomeIndex + 1 > 0
			? welcomeIndex - 1
			: "";
	const storeLocation = receiptResults[storeLocationIndex];

	//======================================
	//LIST OF ITEMS
	//To find the index of where List of items starts
	const firstItemIndex =
		welcomeIndex + 1 > 0
			? welcomeIndex + 1
			: storeLocationIndex
			? storeLocationIndex + 2
			: whyPayIndex + 1 > 0
			? whyPayIndex + 3
			: 0;
	const lastItemIndex =
		receiptResults.findIndex(line => {
			return (
				line.includes("SUBTOTAL") || line.includes("BTOT") || line.includes("SUBT")
			);
		}) - 1;
	const hstIndex = receiptResults.findIndex(line => {
		return (
			line.includes("H=HST") ||
			line.includes("13.000%") ||
			line.includes("13%") ||
			line.includes("HST")
		);
	});
	const totalIndex = receiptResults.findIndex(line => {
		return line.includes("TOTAL");
	});
	const itemsList =
		lastItemIndex + 1 > 0
			? receiptResults.slice(firstItemIndex, lastItemIndex + 1)
			: hstIndex + 1 > 0
			? receiptResults.slice(firstItemIndex, hstIndex)
			: receiptResults[(firstItemIndex, totalIndex - 1)];
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
	const subtotalLine =
		lastItemIndex + 1 > 0
			? receiptResults[lastItemIndex + 1].split(" ")
			: hstIndex + 1 > 0
			? receiptResults[hstIndex - 1].split(" ")
			: receiptResults[totalIndex].split(" ");

	if (subtotalLine.length > 0) {
		const subtotalStr = subtotalLine.pop();
		subtotal = testAmount(subtotalStr.replace(/[^0-9.]+/g, ""));
	}

	//======================================
	//TOTAL

	const totalStr = receiptResults
		.find(line => {
			return (
				(line.includes("TOTAL") ||
					line.includes("OTAL") ||
					line.includes("TOTA")) &&
				!line.includes("SUB")
			);
		})
		?.split(" ")
		?.pop();

	const totalStrNum = totalStr?.replace(/[^0-9.]+/g, "");

	const total = testAmount(totalStrNum);

	const storeData = {
		storeID: storeLocation || "",
		manager: "",
		cashier: "",
		contact: "",
		purchases: itemsList || "",
		subtotal: subtotal || "",
		total: total || "",
	};

	return storeData;
};

module.exports = { receipt };
