const mongoose = require("mongoose");

const receiptRecord = mongoose.Schema({
	time: { type: Number, required: true },
	receiptID: { type: Number, required: true },
	store: { type: String, required: true },
	date: {
		year: Number,
		month: Number,
		day: Number,
	},
	purchaseData: {
		storeID: String,
		address: String,
		manager: String,
		cashier: String,
		contact: String,
		purchases: Array,
		subtotal: String,
		total: String,
	},
	results: Array,
});

module.exports = mongoose.model("ReceiptRecord", receiptRecord);
