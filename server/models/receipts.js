const mongoose = require("mongoose");

const userReceipts = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	user_id: { type: String, required: true },
	user_name: String,
	user_email: String,
	receipts: Array,
});

module.exports = mongoose.model("UserReceipts", userReceipts);
