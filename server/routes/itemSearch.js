const express = require("express");
const router = express.Router();
const grocery = require("../webScrapingFunctions/groceryFunctions");
const searchHistory = require("../data/searchResults");

router.get("/longos/:item/:time", (req, res) => {
	const item = req.params.item;
	const time = parseInt(req.params.time);
	const moreInfo = req.query;

	const prevSearch = searchHistory.find(record => {
		return (
			record.search.toLowerCase() == item.toLowerCase() &&
			record.searchResults[0].store === "Longo's"
		);
	});
	if (prevSearch) {
		const newSearch = {
			...prevSearch,
			...moreInfo,
			time: time,
		};
		searchHistory.push(newSearch);

		res.status(200).json(newSearch);
	} else {
		grocery
			.gateway(item)
			.then(result => {
				const newData = {
					...moreInfo,
					time: time,
					search: item,
					searchResults: result,
				};
				searchHistory.push(newData);
				const data = searchHistory.find(record => {
					return record.time === time;
				});

				res.status(200).json(newData);
			})
			.catch(err => console.log(err));
	}
});

router.get("/walmart/:item/:time", (req, res) => {
	const item = req.params.item;
	const time = parseInt(req.params.time);
	const moreInfo = req.query;

	const prevSearch = searchHistory.find(record => {
		return (
			record.search.toLowerCase() == item.toLowerCase() &&
			record.searchResults[0].store === "Walmart"
		);
	});

	if (prevSearch) {
		const newSearch = { ...prevSearch, ...moreInfo, time: time };
		searchHistory.push(newSearch);
		res.status(200).json(newSearch);
	} else {
		grocery
			.walmart(item)
			.then(result => {
				const newData = {
					...moreInfo,
					time: time,
					search: item,
					searchResults: result,
				};
				searchHistory.push(newData);
				const data = searchHistory.find(record => {
					return record.time === time;
				});

				res.status(200).json(data);
			})
			.catch(err => console.log(err));
	}
});

router.get("/nofrills/:item/:time", (req, res) => {
	const item = req.params.item;
	const time = parseInt(req.params.time);
	const moreInfo = req.query;

	const prevSearch = searchHistory.find(record => {
		return (
			record.search.toLowerCase() == item.toLowerCase() &&
			record.searchResults[0].store === "No Frills"
		);
	});

	if (prevSearch) {
		const newSearch = { ...prevSearch, ...moreInfo, time: time };

		searchHistory.push(newSearch);
		res.status(200).json(newSearch);
	} else {
		grocery
			.nofrills(item)
			.then(result => {
				const newData = {
					...moreInfo,
					time: time,
					search: item,
					searchResults: result,
				};
				searchHistory.push(newData);
				const data = searchHistory.find(record => {
					return record.time === time;
				});

				res.status(200).json(data);
			})
			.catch(err => console.log(err));
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
