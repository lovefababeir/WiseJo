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

		const itemsSearchWords = await ItemResults.distinct("searchItem");
		const itemsSearchTime = await ItemResults.distinct("searchTime");
		const oldSearches = await ItemResults.distinct("searchItem", {
			searchTime: { $lt: sunday.getTime() },
		});
		const oldDocs = await ItemResults.where({
			searchTime: { $lt: sunday.getTime() },
		}).countDocuments();
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

router.get("/receipts/users", async (req, res) => {
	const auth = req.currentUser;

	if (auth) {
		const receiptUsersID = await ReceiptCollection.distinct("user_id");
		const receiptUsersEmail = await ReceiptCollection.distinct("user_email");

		res.send({
			receipt: { IDs: receiptUsersID.length, emails: receiptUsersEmail },
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
