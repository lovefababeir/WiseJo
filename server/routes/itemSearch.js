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

const searchDate = timestamp => {
	let dateSubmitted = new Date(timestamp);
	return {
		year: dateSubmitted.getFullYear(),
		month: dateSubmitted.getMonth() + 1,
		day: dateSubmitted.getUTCDate(),
	};
};

router.get("/longos/:item/:time", (req, res) => {
	const item = req.params.item;
	const time = parseInt(req.params.time);
	const userlocation = req.query.userlocation;
	const userid = "lovefababeir";
	const store = "Longo's";
	console.log(userlocation);

	//Checks if there is already an up to date(same day) result.
	ItemResults.find({
		searchItem: item,
		store: "Longo's",
		date: searchDate(time),
	})
		.exec()
		.then(result => {
			//if there is already something on record, copy it onto the UserResults collection
			if (result.length) {
				const data = result[0];
				promiseFcn
					.createUserCopy(data, userid, userlocation, time)
					.then(result => {
						console.log("Recorded in userResults");
						res
							.status(201)
							.json({ message: "Found data already on record", data: result });
					})
					.catch(error => {
						res.status(500).json({
							message: `Found something from a previous search today but could not log user data: ${error}`,
							data: userData,
						});
						console.log(
							`Found something from a previous search today but could not log user data: ${error}`,
						);
					});
				//if there is nothing on record, conduct a new search
			} else {
				console.log("No record of search yet.  Website search requested");
				longos
					.store(item)
					.then(result => {
						console.log("-----GOT RESULTS FROM WEBSITE------");
						//If there were no results from the search then don't log the research and just return a message.
						if (!result.length) {
							res
								.status(400)
								.send(
									"No results found. Please check that the spelling of the item is correct or try again later.",
								);
						} else {
							//if search was succesful with at least one result,
							//add it to the UserResults collection
							promiseFcn
								.recordNewSearchUserCopy(
									userid,
									userlocation,
									item,
									time,
									searchDate(time),
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
							promiseFcn
								.recordNewSearch(item, time, searchDate(time), store, result)
								.then(result => {
									res.status(201).json({
										message: "Successful search on the item.",
										data: result,
									});
								})
								.catch(error => {
									res.status(500).json({
										message: "Could not created a record of the search results",
										error: error,
									});
								});
						}
					})
					.catch(err => {
						console.log(`Could not complete Longo's search for ${item}: ${err}`);
						res
							.status(500)
							.json(
								`Could not complete Longo's search for ${item}. Internal issue with Longo's function: ${err}`,
							);
					});
			}
		})
		.catch(err => {
			console.log(
				`Could not conduct a search for the item in the database: ${err}`,
			);
			res
				.status(500)
				.json(`Had problems with checking history of searches for ${item}.`);
		});
});

router.get("/sobeys/:item/:time", (req, res) => {
	const item = req.params.item;
	const time = parseInt(req.params.time) - 3600000 * 4;
	const moreInfo = req.query;

	const alreadySearched = searchHistory.filter(record => {
		return (
			record.search.toLowerCase() == item.toLowerCase() &&
			record.searchResults[0].store === "Sobeys"
		);
	});
	const prevSearch = alreadySearched ? alreadySearched.pop() : "";

	if (prevSearch) {
		const newSearch = {
			...prevSearch,
			...moreInfo,
			time: time,
		};
		searchHistory.push(newSearch);

		res.status(200).json(newSearch);
	} else {
		sobeys
			.store(item)
			.then(result => {
				if (!result.length) {
					res
						.status(400)
						.send(
							"No results found. Please check that the spelling of the item is correct or try again later.",
						);
				} else {
					const newData = {
						...moreInfo,
						time: time,
						search: item,
						searchResults: result,
					};
					searchHistory.push(newData);
					res.status(200).json(newData);
				}
			})
			.catch(err => {
				console.log(`Could not complete Sobeys search for ${item}: ${err}`);
				res
					.status(500)
					.json(
						`Could not complete Sobeys search for ${item}. Internal issue with Sobeys function: ${err}`,
					);
			});
	}
});

router.get("/walmart/:item/:time", (req, res) => {
	const item = req.params.item;
	const time = parseInt(req.params.time) - 3600000 * 4;
	const moreInfo = req.query;

	const alreadySearched = searchHistory.filter(record => {
		return (
			record.search.toLowerCase() == item.toLowerCase() &&
			record.searchResults[0].store === "Walmart"
		);
	});
	const prevSearch = alreadySearched ? alreadySearched.pop() : "";

	if (prevSearch) {
		const newSearch = { ...prevSearch, ...moreInfo, time: time };
		searchHistory.push(newSearch);
		res.status(200).json(newSearch);
	} else {
		walmart
			.store(item)
			.then(result => {
				if (!result.length) {
					res
						.status(400)
						.send(
							"No results found. Please check that the spelling of the item is correct or try again later.",
						);
				} else {
					const newData = {
						...moreInfo,
						time: time,
						search: item,
						searchResults: result,
					};
					searchHistory.push(newData);
					res.status(200).json(newData);
				}
			})
			.catch(err => {
				console.log(`Could not complete Walmart search for ${item}: ${err}`);
				res
					.status(500)
					.json(
						`Could not complete Walmart search for ${item}. Internal issue with Walmart function: ${err}`,
					);
			});
		// res.status(200).send("Not available at the moment. Please try again later");
	}
});

router.get("/nofrills/:item/:time", (req, res) => {
	const item = req.params.item;
	const time = parseInt(req.params.time) - 3600000 * 4;
	const moreInfo = req.query;

	const alreadySearched = searchHistory.filter(record => {
		return (
			record.search.toLowerCase() == item.toLowerCase() &&
			record.searchResults[0].store === "No Frills"
		);
	});
	const prevSearch = alreadySearched ? alreadySearched.pop() : "";

	if (prevSearch) {
		const newSearch = { ...prevSearch, ...moreInfo, time: time };

		searchHistory.push(newSearch);
		res.status(200).json(newSearch);
	} else {
		nofrills
			.store(item)
			.then(result => {
				if (!result.length) {
					res
						.status(400)
						.send(
							"No results found. Please check that the spelling of the item is correct or try again later.",
						);
				} else {
					const newData = {
						...moreInfo,
						time: time,
						search: item,
						searchResults: result,
					};
					searchHistory.push(newData);
					res.status(200).json(newData);
				}
			})
			.catch(err => {
				console.log(`Could not complete No Frills search for ${item}: ${err}`);
				res
					.status(500)
					.json(
						`Could not complete No Frills search for ${item}. Internal issue with No Frills function: ${err}`,
					);
			});
	}
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
