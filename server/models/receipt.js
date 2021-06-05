const mongoose = require("mongoose");

const receiptDoc = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	user_id: { type: String, required: true },
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

module.exports = mongoose.model("ReceiptDoc", receiptDoc);
