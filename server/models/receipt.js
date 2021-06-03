const mongoose = require("mongoose");

const receiptDoc = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	time: Number,
	receiptID: Number,
	store: String,
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
		subtotal: Number,
		total: Number,
	},
	results: Array,
});

module.exports = mongoose.model("ReceiptDoc", receiptDoc);
