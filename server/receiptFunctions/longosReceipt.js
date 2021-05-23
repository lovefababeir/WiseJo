const receipt = receiptResults => {
	//To get store details ID
	const storeDetailsIndex = receiptResults.findIndex(text => {
		return text.includes("Cashier");
	});

	//store details
	const storeDetails = receiptResults.slice(0, storeDetailsIndex + 1);

	let contact;
	let storeLocation;
	let manager;
	let cashier;
	//=====Store location and contact details:
	if (storeDetails) {
		const locationDetails = storeDetails
			? storeDetails
					.find(line => {
						return line.includes("Longos") && line.includes("-");
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
		//store Manager:
		const lineWithManager =
			storeDetails
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

		//Cashier details:
		const cashierLine = storeDetails
			.find(line => {
				return line.includes("Cashier");
			})
			.split(" ");

		const cashierIndex = cashierLine.findIndex(word => {
			return word.includes("was");
		});
		cashier = cashierLine[cashierIndex + 1];
	}

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

	//SUBTOTAL
	let subtotal;
	const subtotalLine = receiptResults
		.find(text => {
			return text.includes("Subtotal");
		})
		.split(" ");

	if (subtotalLine.length > 0) {
		const subtotalStr = subtotalLine.pop();
		subtotal = Number(subtotalStr.replace(/[^0-9.-]+/g, ""));
	}

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
		total = Number(totalStr.replace(/[^0-9.-]+/g, ""));
	}

	const storeData = {
		storeID: storeLocation || "No info detected",
		manager: manager || "No info detected",
		cashier: cashier || "No info detected",
		contact: contact || "No info detected",
		purchases: itemsList || "No info detected",
		subtotal: subtotal || "No info detected",
		total: total || "No info detected",
	};

	return storeData;
};

module.exports = { receipt };
