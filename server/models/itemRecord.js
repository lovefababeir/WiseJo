const mongoose = require("mongoose");

const itemRecord = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	searchItem: String,
	searchTime: Number,
	date: { year: Number, month: Number, day: Number },
	store: String,
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

module.exports = mongoose.model("ItemRecord", itemRecord);
