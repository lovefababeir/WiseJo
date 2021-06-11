const receipt = receiptResults => {
	let contact;
	let storeLocation;
	let manager;
	let cashier;
	//=====Store location and contact details:

	const locationDetails = receiptResults.find(line => {
		return line.includes("Longos") || line.includes("-");
	})
		? receiptResults
				.find(line => {
					return line.includes("Longos") || line.includes("-");
				})
				?.split(" ")
		: [];
	if (locationDetails.length) {
		const contactIndex = locationDetails.findIndex(word => {
			return word.includes("-");
		});

		contact = locationDetails.splice(contactIndex)[0];
		storeLocation = locationDetails.join(" ");
	} else {
		contact = "No info detected";
		storeLocation = "No info detected";
	}

	//======================================
	//store Manager:
	const lineWithManager =
		receiptResults
			.find(line => {
				return line.includes("Manager");
			})
			?.split(" ") || "";
	manager = lineWithManager
		?.slice(
			lineWithManager.findIndex(word => {
				return word.includes("is");
			}) + 1,
		)
		?.join(" ");

	//======================================
	//Cashier details:
	const cashierLine = receiptResults
		.find(line => {
			return (
				line.includes("Cashier") ||
				(line.includes("Today") && line.includes("was")) ||
				(line.includes("Your") && line.includes("was")) ||
				(line.includes("Your") && line.includes("Today"))
			);
		})
		?.split(" ");

	if ([...cashierLine].length > 1) {
		const cashierIndex =
			cashierLine.findIndex(word => {
				return word.includes("was");
			}) + 1;

		cashier = cashierLine.splice(cashierIndex).join(" ");
	} else {
		cashier = cashierLine[0];
	}

	//======================================
	//LIST OF ITEMS
	//To find the index of where List of items starts
	const firstItemsIndex =
		receiptResults.findIndex(line => {
			return line.includes("$");
		}) - 1;
	const subtotalIndex = receiptResults.findIndex(line => {
		return (
			(line.includes("Items") && line.includes("Subtotal")) ||
			line.includes("Subtotal") ||
			(line.includes("$") && line.includes("Items")) ||
			(line.includes("Sub") && line.includes("Items")) ||
			(line.includes("total") && line.includes("Items"))
		);
	});

	let itemsList;
	if (firstItemsIndex + 1 > 0 && subtotalIndex + 1 > 0) {
		itemsList = receiptResults.slice(firstItemsIndex, subtotalIndex);
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

	if (subtotalLine.length > 0) {
		const subtotalStr = subtotalLine.pop();
		subtotal =
			(subtotalStr && testAmount(subtotalStr.replace(/[^0-9.]+/g, ""))) || "";
	}

	//======================================
	//TOTAL
	let total;
	const totalStr = receiptResults
		.find(line => {
			return line.includes("TOTAL") || line.includes("Item count");
		})
		?.split(" ")
		?.pop();

	const paymentLine = receiptResults.find(line => {
		return (
			line.includes("Debit Card") ||
			line.includes("Debit ") ||
			line.includes("Debit Card") ||
			line.includes("Master Card") ||
			line.includes("Credit Card")
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
		storeID: storeLocation || "",
		manager: manager || "",
		cashier: cashier || "",
		contact: contact || "",
		purchases: itemsList || "",
		subtotal: subtotal || "",
		total: total || "",
	};

	return purchaseData;
};

module.exports = { receipt };
