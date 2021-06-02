const mongoose = require("mongoose");

const itemResults = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	searchItem: String,
	searchTime: Number,
	date: { year: Number, month: Number, day: Number },
	store: String,
	searchResults: Array,
});

module.exports = mongoose.model("ItemResults", itemResults);
