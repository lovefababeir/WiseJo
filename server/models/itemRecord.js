const mongoose = require("mongoose");

const itemRecord = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	searchItem: String,
	searchTime: Number,
	date: { year: Number, month: Number, day: Number },
	store: String,
	loblaws: Array,
	longos: Array,
	nofrills: Array,
	sobeys: Array,
	superstore: Array,
	walmart: Array,
});

module.exports = mongoose.model("ItemRecord", itemRecord);
