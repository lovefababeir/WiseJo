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
				.split(" ")
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
			.split(" ") || "";
	manager = lineWithManager
		.slice(
			lineWithManager.findIndex(word => {
				return word.includes("is");
			}) + 1,
		)
		.join(" ");

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
	const lastItemIndex = receiptResults.findIndex(line => {
		return (
			(line.includes("Items") && line.includes("Subtotal")) ||
			(line.includes("$") && line.includes("Items"))
		);
	});
	let itemsList;
	if (firstItemsIndex + 1 > 0 && lastItemIndex + 1 > 0) {
		itemsList = receiptResults.slice(firstItemsIndex, lastItemIndex);
	}

	//======================================
	//Correcting Money Amount
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

	//======================================
	//SUBTOTAL
	let subtotal;
	const subtotalLine = receiptResults
		.find(text => {
			return text.includes("Subtotal");
		})
		?.split(" ");

	if (subtotalLine.length > 0) {
		const subtotalStr = subtotalLine.pop();
		subtotal = Number(testAmount(subtotalStr).replace(/[^0-9.-]+/g, ""));
	}

	//======================================
	//TOTAL
	let total;
	const totalLine = receiptResults
		.find(line => {
			return line.includes("TOTAL") || line.includes("Item count");
		})
		.split(" ");
	if (totalLine) {
		const totalStr = totalLine.pop();

		// const totalStr = withTotal[totalIndex];
		total = Number(testAmount(totalStr).replace(/[^0-9.-]+/g, ""));
	}

	const storeData = {
		storeID: storeLocation || "",
		manager: manager || "",
		cashier: cashier || "",
		contact: contact || "",
		purchases: itemsList || "",
		subtotal: subtotal || "",
		total: total || "",
	};

	return storeData;
};

module.exports = { receipt };
