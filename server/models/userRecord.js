const mongoose = require("mongoose");

const userRecord = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	user_id: String,
	user_name: String,
	user_email: String,
	userlocation: String,
	time: Number,
	searchItem: String,
	searchTime: Number,
	date: { year: Number, month: Number, day: Number },
	loblaws: Array,
	longos: Array,
	nofrills: Array,
	sobeys: Array,
	superstore: Array,
	walmart: Array,
});

module.exports = mongoose.model("UserRecord", userRecord);
