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
	loblaws: {
		searchResults: Array,
		time: Number,
	},
	longos: {
		searchResults: Array,
		time: Number,
	},
	nofrills: {
		searchResults: Array,
		time: Number,
	},
	sobeys: {
		searchResults: Array,
		time: Number,
	},
	superstore: {
		searchResults: Array,
		time: Number,
	},
	walmart: {
		searchResults: Array,
		time: Number,
	},
});

module.exports = mongoose.model("UserRecord", userRecord);
