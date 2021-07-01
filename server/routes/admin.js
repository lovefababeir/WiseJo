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
	}
});

router.get("/items/users", async (req, res) => {
	const itemsUsersID = await UserResults.distinct("user_id");
	const itemsUsersEmail = await UserResults.distinct("user_email");

	res.send({
		users: { IDs: itemsUsersID.length, email: itemsUsersEmail },
	});
});

router.get("/receipts/users", async (req, res) => {
	const receiptUsersID = await ReceiptCollection.distinct("user_id");
	const receiptUsersEmail = await ReceiptCollection.distinct("user_email");

	res.send({
		receipt: { IDs: receiptUsersID.length, emails: receiptUsersEmail },
	});
});

module.exports = router;
