const express = require("express");
const router = express.Router();
const longos = require("../webScrapingFunctions/gateway");
const sobeys = require("../webScrapingFunctions/sobeys");
const walmart = require("../webScrapingFunctions/walmart");
const nofrills = require("../webScrapingFunctions/nofrills");
const ItemResults = require("../models/itemResults.js");
const UserResults = require("../models/userResults.js");
const mongoose = require("mongoose");
const promiseFcn = require("../promiseFunctions/promiseFunctions");

const conductSearch = async (
	storeFunction,
	item,
	time,
	userlocation,
	userid,
	store,
) => {
	//convert timestamp to date
	const dateSubmitted = new Date(time);
	const searchDate = {
		year: dateSubmitted.getFullYear(),
		month: dateSubmitted.getMonth() + 1,
		day: dateSubmitted.getUTCDate(),
	};

	//Checks if there is already an up to date(same day) result.
	const responseData = await ItemResults.find({
		searchItem: item,
		store: store,
		date: searchDate,
	})
		.exec()
		.then(result => {
			//if there is already something on record, copy it onto the UserResults collection
			if (result.length) {
				const data = result[0];
				return promiseFcn
					.createUserCopy(data, userid, userlocation, time)
					.then(result => {
						console.log("Recorded in userResults");
						return {
							code: 201,
							jsonData: { message: "Found data already on record", data: result },
						};
					})
					.catch(error => {
						console.log(
							`Found something from a previous search today but could not log user data: ${error}`,
						);
						return {
							code: 500,
							jsonData: {
								message: `Found something from a previous search today but could not log user data: ${error}`,
								data: userData,
							},
						};
					});
				//if there is nothing on record, conduct a new search
			} else {
				console.log("No record of search yet.  Website search requested");
				return storeFunction
					.store(item)
					.then(result => {
						console.log("-----GOT RESULTS FROM WEBSITE------");
						//If there were no results from the search then don't log the research and just return a message.
						if (!result.length) {
							return {
								code: 400,
								jsonData: {
									message:
										"No results found. Please check that the spelling of the item is correct or try again later.",
								},
							};
						} else {
							//if search was succesful with at least one result,
							//add it to the UserResults collection
							promiseFcn
								.recordNewSearchUserCopy(
									userid,
									userlocation,
									item,
									time,
									searchDate,
									store,
									result,
								)
								.then(result => {
									console.log("Recorded in userResults");
								})
								.catch(error => {
									console.log(`Could not log user data: ${error}`);
								});
							//add it to the ItemsResults collection
							return promiseFcn
								.recordNewSearch(item, time, searchDate, store, result)
								.then(result => {
									return {
										code: 201,
										jsonData: {
											message: "Successful search on the item.",
											data: result,
										},
									};
								})
								.catch(error => {
									return {
										code: 500,
										jsonData: {
											message: "Could not created a record of the search results",
											error: error,
										},
									};
								});
						}
					})
					.catch(error => {
						console.log(`Could not complete ${store} search for ${item}: ${error}`);
						return {
							code: 500,
							jsonData: {
								message: `Could not complete ${store} search for ${item}. Internal issue with ${store} function`,
								error: error,
							},
						};
					});
			}
		})
		.then(response => {
			return response;
		})
		.catch(err => {
			console.log(
				`Could not conduct a search for the item in the database: ${err}`,
			);
			return {
				code: 500,
				jsonData: {
					message: `Had problems with checking history of searches for ${item}.`,
					error: error,
				},
			};
		});
	return responseData;
};

router.get("/:store/:time", async (req, res) => {
	const time = parseInt(req.params.time);
	const userlocation = req.query.userlocation;
	const item = req.query.item;
	const userid = "lovefababeir";
	console.log(req.params.store);
	const store =
		req.params.store === "longos"
			? "Longo's"
			: req.params.store === "sobeys"
			? "Sobeys"
			: req.params.store === "walmart"
			? "Walmart"
			: req.params.store === "nofrills"
			? "No Frills"
			: "n/a";
	const storeFunction =
		req.params.store === "longos"
			? longos
			: req.params.store === "sobeys"
			? sobeys
			: req.params.store === "walmart"
			? walmart
			: req.params.store === "nofrills"
			? nofrills
			: "n/a";
	console.log(userlocation);

	const responseData = await conductSearch(
		storeFunction,
		item,
		time,
		userlocation,
		userid,
		store,
	);
	console.log("inside endpoint", responseData.code, responseData.jsonData);
	res.status(responseData.code).json(responseData.jsonData);
});

router.get("/history", (req, res) => {
	res.status(200).json(searchHistory);
});

router.delete("/item/:id", (req, res) => {
	const itemID = req.params.id;

	const lastSearchIndex = searchHistory.length - 1;

	var lastSearchList = searchHistory.filter(search => {
		return searchHistory[lastSearchIndex].time === search.time;
	});

	for (
		var i = lastSearchIndex;
		i > lastSearchIndex - lastSearchList.length;
		i--
	) {
		for (var j = 0; j < searchHistory[i].searchResults.length; j++) {
			if (searchHistory[i].searchResults[j].productID === itemID) {
				searchHistory[i].searchResults.splice(j, 1);
			}
		}
	}

	console.log(lastSearchList);

	res.status(200).json(lastSearchList);
});

router.delete("/items/:value/:quantity", (req, res) => {
	const itemValue = parseInt(req.params.value);
	const itemQuantity = parseInt(req.params.quantity);

	const lastSearchIndex = searchHistory.length - 1;

	for (var i = lastSearchIndex; i > lastSearchIndex - 3; i--) {
		for (var j = 0; j < searchHistory[i].searchResults.length; j++) {
			if (
				searchHistory[i].searchResults[j].value === itemValue &&
				searchHistory[i].searchResults[j].quantity === itemQuantity
			) {
				console.log(searchHistory[i].searchResults[j].productID);
				searchHistory[i].searchResults.splice(j, 1);
			}
		}
	}

	const lastSearchList = searchHistory.filter(search => {
		return searchHistory[lastSearchIndex].time === search.time;
	});

	console.log(lastSearchList);

	res.status(200).json(lastSearchList);
});

module.exports = router;
