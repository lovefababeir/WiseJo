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

mongoose.set("useFindAndModify", false);

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
						return {
							code: 201,
							jsonData: { message: "Found data already on record", data: result },
						};
					})
					.catch(error => {
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
				return storeFunction
					.store(item)
					.then(result => {
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
	const auth = req.currentUser;
	if (auth) {
		const time = parseInt(req.params.time);
		const userlocation = req.query.userlocation;
		const item = req.query.item;
		const userid = auth.user_id;
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

		const responseData = await conductSearch(
			storeFunction,
			item,
			time,
			userlocation,
			userid,
			store,
		);
		res.status(responseData.code).json(responseData.jsonData);
	} else {
		res
			.status(403)
			.send(
				"Sorry, you are not authorized to access the databased. Please check with Wisejo adminstration.",
			);
	}
});

router.get("/searchresults", async (req, res) => {
	const auth = req.currentUser;
	if (auth) {
		const allItems = await UserResults.find({ user_id: auth.user_id });
		const latestTimeStamp = allItems.reduce((latest, record) => {
			return latest > record.time ? latest : record.time;
		}, 0);

		try {
			await UserResults.deleteMany({
				time: { $ne: latestTimeStamp },
				user_id: auth.user_id,
			});
		} catch (error) {
			console.log(`Unable to clear old searches. Error: ${err}`);
		}
		const latestSearchResults = await UserResults.find({
			time: latestTimeStamp,
			user_id: auth.user_id,
		});
		res
			.status(200)
			.json({ message: "Success! Results retrieved", data: latestSearchResults });
	} else {
		res
			.status(403)
			.send(
				"Sorry, you are not authorized to access the databased. Please check with Wisejo adminstration.",
			);
	}
});

router.delete("/item/:store/:id", async (req, res) => {
	const auth = req.currentUser;

	if (auth) {
		const itemID = req.params.id;
		const store = req.params.store;

		//Finds the document for the specified store where the item is from.
		UserResults.find({
			store: store,
			user_id: auth.user_id,
		})
			.exec()
			.then(result => {
				//Copies the searchResults from the store and removes the item with the itemID.
				const listofItems = result[0].searchResults;
				const itemToRemove = listofItems.findIndex(item => {
					return item.productID === itemID;
				});
				if (itemToRemove + 1 > 0) {
					listofItems.splice(itemToRemove, 1);
				} else {
					console.log("Not in the list-------------");
				}
				return listofItems;
			})
			.then(result => {
				//Replaces the old array in the document with the new array wherein the item with itemID no longer exists in.
				return UserResults.findOneAndUpdate(
					{ store: store, user_id: auth.user_id },
					{ searchResults: result },
					{ new: true },
				);
			})
			.then(result => {
				res.status(200).json(result);
			})
			.catch(err => {
				return {
					code: 500,
					jsonData: {
						message: "Had problems finding and deleting the item",
						error: err,
					},
				};
			});
	} else {
		res
			.status(403)
			.send(
				"Sorry, you are not authorized to access the databased. Please check with Wisejo adminstration.",
			);
	}
});

router.delete("/items/:value/:quantity", async (req, res) => {
	const auth = req.currentUser;

	if (auth) {
		const itemValue = parseInt(req.params.value);
		const itemQuantity = parseInt(req.params.quantity);

		const resultList = await UserResults.find({ user_id: auth.user_id });

		Promise.all(
			resultList.map(async doc => {
				const store = doc.store;
				const changedDoc = await UserResults.find({
					store: store,
					user_id: auth.user_id,
				})
					.exec()
					.then(doc => {
						const list = doc[0].searchResults.filter(item => {
							return item.value !== itemValue || item.quantity !== itemQuantity;
						});

						return list;
					})
					.then(newList => {
						return UserResults.findOneAndUpdate(
							{ store: store, user_id: auth.user_id },
							{ searchResults: newList },
							{ new: true },
						);
					})
					.then(result => {
						return result;
					})
					.catch(err => {
						return err;
					});

				return changedDoc;
			}),
		)
			.then(result => {
				res.status(200).json(result);
			})
			.catch(err => {
				res.status(500).json(err);
			});
	} else {
		res
			.status(403)
			.send(
				"Sorry, you are not authorized to access the databased. Please check with Wisejo adminstration.",
			);
	}
});

module.exports = router;
