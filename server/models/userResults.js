const mongoose = require("mongoose");

const userResults = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	userid: String,
	userlocation: String,
	time: Number,
	searchItem: String,
	searchTime: Number,
	date: { year: Number, month: Number, day: Number },
	store: String,
	searchResults: Array,
});

module.exports = mongoose.model("UserResults", userResults);
