const mongoose = require("mongoose");
const express = require("express");
const UserRecord = require("../models/userRecord.js");
const ItemRecord = require("../models/itemRecord.js");

const recordNewSearch = (item, time, searchDate) => {
	const itemResultsData = {
		_id: new mongoose.Types.ObjectId(),
		searchItem: item,
		searchTime: time,
		date: searchDate,
	};

	const itemData = new ItemRecord(itemResultsData);
	return itemData.save();
};

const recordNewSearchUserCopy = (
	userid,
	username,
	useremail,
	userlocation,
	item,
	time,
	searchDate,
) => {
	const userResultsData = {
		user_id: userid,
		user_name: username,
		user_email: useremail,
		userlocation: userlocation,
		time: time,
		_id: new mongoose.Types.ObjectId(),
		searchItem: item,
		date: searchDate,
	};
	const userData = new UserRecord(userResultsData);
	return userData.save();
};

module.exports = { recordNewSearch, recordNewSearchUserCopy };
