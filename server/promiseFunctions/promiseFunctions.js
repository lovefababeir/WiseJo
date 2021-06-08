const mongoose = require("mongoose");
const express = require("express");
const UserResults = require("../models/userResults.js");
const ItemResults = require("../models/itemResults.js");

const createUserCopy = (data, userid, userlocation, time) => {
	const userResultsData = {
		_id: mongoose.Types.ObjectId(),
		user_id: userid,
		userlocation: userlocation,
		time: time,
		searchItem: data.searchItem,
		searchTime: data.searchTime,
		date: data.date,
		store: data.store,
		searchResults: data.searchResults,
	};
	const userData = new UserResults(userResultsData);
	return userData.save();
};

const recordNewSearch = (item, time, searchDate, store, result) => {
	const itemResultsData = {
		_id: new mongoose.Types.ObjectId(),
		searchItem: item,
		searchTime: time,
		date: searchDate,
		store: store,
		searchResults: result,
	};

	const itemData = new ItemResults(itemResultsData);
	return itemData.save();
};

const recordNewSearchUserCopy = (
	userid,
	userlocation,
	item,
	time,
	searchDate,
	store,
	result,
) => {
	const userResultsData = {
		user_id: userid,
		userlocation: userlocation,
		time: time,
		_id: new mongoose.Types.ObjectId(),
		searchItem: item,
		searchTime: time,
		date: searchDate,
		store: store,
		searchResults: result,
	};
	const userData = new UserResults(userResultsData);
	return userData.save();
};

module.exports = { createUserCopy, recordNewSearch, recordNewSearchUserCopy };
