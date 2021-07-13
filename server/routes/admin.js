const express = require("express");
const router = express.Router();
const ItemResults = require("../models/itemRecord");
const UserResults = require("../models/userRecord.js");
const ReceiptCollection = require("../models/receipts");

router.get("/items", async (req, res) => {
	const auth = req.currentUser;
	if (auth) {
		const today = new Date();
		const daysSinceSunday =
			today.getDay() === 0 ? today.getDay() + 6 : today.getDay() - 1;
		const sunday = new Date(
			today.getFullYear(),
			today.getUTCMonth(),
			today.getUTCDate() - daysSinceSunday,
		);

		// A list of the items searched.
		const itemsSearchWords = await ItemResults.distinct("searchItem");

		// A list of all the times the items were searched. Some times have the same search words if the old record has not been deleted.
		const itemsSearchTime = await ItemResults.distinct("searchTime");

		//list of the items that have old records.
		const oldSearches = await ItemResults.distinct("searchItem", {
			searchTime: { $lt: sunday.getTime() },
		});

		//Number of documents that are old and need to be deleted.
		const oldDocs = await ItemResults.where({
			searchTime: { $lt: sunday.getTime() },
		}).countDocuments();

		//Number of documents
		const docs = await ItemResults.countDocuments();

		res.send({
			items: {
				searchWords: itemsSearchWords,
				num_of_searches: itemsSearchTime.length,
				num_of_docs: docs,
			},
			oldItems: {
				itemList: oldSearches,
				num_of_old_docs: oldDocs,
			},
		});
	} else {
		res
			.status(403)
			.send(
				"Sorry, you are not authorized to access the databased. Please check with Wisejo adminstration.",
			);
	}
});

router.get("/items/stores", async (req, res) => {
	const auth = req.currentUser;

	if (auth) {
		const storesList = [
			"loblaws",
			"longos",
			"nofrills",
			"sobeys",
			"superstore",
			"walmart",
		];
		const totalDocs = await ItemResults.countDocuments();

		const storeResults = await Promise.all(
			storesList.map(async store => {
				const resultsCount = await ItemResults.where({
					[store]: { $size: 0 },
				}).countDocuments();
				return { store: store, num_of_results: totalDocs - resultsCount };
			}),
		)
			.then(result => {
				return result;
			})
			.catch(err => console.log(err));

		res.send({
			storeResults,
		});
	} else {
		res
			.status(403)
			.send(
				"Sorry, you are not authorized to access the databased. Please check with Wisejo adminstration.",
			);
	}
});

router.get("/items/users", async (req, res) => {
	const auth = req.currentUser;

	if (auth) {
		const itemsUsersID = await UserResults.distinct("user_id");
		const itemsUsersEmail = await UserResults.distinct("user_email");

		res.send({
			users: { IDs: itemsUsersID.length, email: itemsUsersEmail },
		});
	} else {
		res
			.status(403)
			.send(
				"Sorry, you are not authorized to access the databased. Please check with Wisejo adminstration.",
			);
	}
});

router.get("/receipts", async (req, res) => {
	const auth = req.currentUser;

	if (auth) {
		const receiptUsersID = await ReceiptCollection.distinct("user_id");
		const receiptUsersEmail = await ReceiptCollection.distinct("user_email");

		const receiptList = [];
		const list = await ReceiptCollection.find({});
		list.forEach(user => {
			receiptList.push(...user.receipts);
		});

		const stores = receiptList
			.map(receipt => {
				return receipt.store;
			})
			.sort();
		const storesList = [...new Set(stores)];

		const storeData = storesList.map(store => {
			return { store: store, receiptQty: stores.filter(x => x === store).length };
		});

		res.send({
			IDs: receiptUsersID.length,
			emails: receiptUsersEmail,
			receiptData: storeData,
		});
	} else {
		res
			.status(403)
			.send(
				"Sorry, you are not authorized to access the databased. Please check with Wisejo adminstration.",
			);
	}
});

router.delete("/olditems", async (req, res) => {
	const auth = req.currentUser;
	if (!auth) {
		res
			.status(403)
			.send(
				"Sorry, you are not authorized to access the databased. Please check with Wisejo adminstration.",
			);
		return;
	}

	//This counts the number of days since Sunday Midnight.
	//All items are taken from the record if its from any time the same week since Monday.
	//Updates on prices are retrieved on the first time it is requested from Monday 00:00am.
	const today = new Date();
	const timeStamp = today.getTime();
	const sundayStamp = timeStamp - today.getDay() * 86400000;
	console.log(sundayStamp);
	const sunday = new Date(sundayStamp);
	console.log(sunday.getTime());
	// const daysSince =
	// 	today.getUTCDay() === 0 ? today.getUTCDay() + 6 : today.getUTCDay();
	// console.log(daysSince);
	const sundayMidnight = new Date(
		sunday.getFullYear(),
		sunday.getUTCMonth(),
		sunday.getUTCDate(),
	);
	console.log(sundayMidnight.getTime());
	//Checks if there is already an up to date(same day) result.
	ItemResults.deleteMany({
		searchTime: { $lt: sundayMidnight.getTime() },
	})
		.exec()
		.then(result => {
			console.log(result);
		})
		.catch(err => console.log(err));
});

module.exports = router;
