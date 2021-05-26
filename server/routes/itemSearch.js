const express = require("express");
const router = express.Router();
const longos = require("../webScrapingFunctions/gateway");
const sobeys = require("../webScrapingFunctions/sobeys");
const walmart = require("../webScrapingFunctions/walmart");
const nofrills = require("../webScrapingFunctions/nofrills");
const searchHistory = require("../data/searchResults");

router.get("/longos/:item/:time", (req, res) => {
	const item = req.params.item;
	const time = parseInt(req.params.time);
	const moreInfo = req.query;

	const alreadySearched = searchHistory.filter(record => {
		return (
			record.search.toLowerCase() == item.toLowerCase() &&
			record.searchResults[0].store === "Longo's"
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
		longos
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
				console.log(`Could not complete Longos search for ${item}: ${err}`);
				res.status(400).json(`Could not complete Longos search for ${item}`);
			});
	}
});

router.get("/sobeys/:item/:time", (req, res) => {
	const item = req.params.item;
	const time = parseInt(req.params.time);
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
				res.status(400).json(`Could not complete Sobeys search for ${item}`);
			});
	}
});

router.get("/walmart/:item/:time", (req, res) => {
	const item = req.params.item;
	const time = parseInt(req.params.time);
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
				res.status(400).json(`Could not complete Walmart search for ${item}`);
			});
		// res.status(200).send("Not available at the moment. Please try again later");
	}
});

router.get("/nofrills/:item/:time", (req, res) => {
	const item = req.params.item;
	const time = parseInt(req.params.time);
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
				res.status(400).json(`Could not complete No Frills search for ${item}`);
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
