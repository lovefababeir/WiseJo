const express = require("express");
const router = express.Router();
const longos = require("../webScrapingFunctions/longos");
const sobeys = require("../webScrapingFunctions/sobeys");
const walmart = require("../webScrapingFunctions/walmart");
const nofrills = require("../webScrapingFunctions/nofrills");
const loblaws = require("../webScrapingFunctions/loblaws");
const superstore = require("../webScrapingFunctions/superstore");
const itemCollection = require("../models/itemRecord.js");
const mongoose = require("mongoose");
const promiseFcn = require("../promiseFunctions/promiseFunctions2");
const userCollection = require("../models/userRecord");
const cors = require("cors");

mongoose.set("useFindAndModify", false);

const options = {
	origin: "https://wisejo.netlify.app",
	optionsSuccessStatus: 200,
	methods: ["GET,HEAD,PUT,PATCH,POST,DELETE"],
	credentials: true,
};

express().options("/initaterecord/:time", cors(options));
router.get("/initaterecord/:time", cors(options), async (req, res) => {
	const auth = req.currentUser;

	if (auth) {
		const time = parseInt(req.params.time);
		const userlocation = req.query.userlocation;
		const item = req.query.item;
		const userid = auth.user_id;
		const username = auth.name;
		const useremail = auth.email;
		//convert EST timestamp to date
		// const dateSubmitted = new Date(time);
		const dateSubmittedEST = new Date(time - 14400000);

		const searchDate = {
			year: dateSubmittedEST.getFullYear(),
			month: dateSubmittedEST.getUTCMonth() + 1,
			day: dateSubmittedEST.getUTCDate(),
		};

		//This counts the number of days since Sunday Midnight.
		//All items are taken from the record if its from any time the same week since Monday.
		//Updates on prices are retrieved on the first time it is requested from Monday 00:00am.
		const daysSince =
			dateSubmittedEST.getUTCDay() === 0
				? dateSubmittedEST.getUTCDay() + 6
				: dateSubmittedEST.getUTCDay() - 1;

		const sundayMidnight = new Date(
			searchDate.year,
			searchDate.month - 1,
			searchDate.day - daysSince,
		);

		//Checks if there is already an up to date(same day) result.
		const responseData = await itemCollection
			.find({
				searchItem: item,
				searchTime: { $gt: sundayMidnight.getTime() },
			})
			.exec()
			.then(existingRecord => {
				if (existingRecord.length) {
					// console.log("item already in record=======");
					return existingRecord[0];
				} else {
					return promiseFcn
						.recordNewSearch(item, time, searchDate)
						.then(recordCreated => {
							// console.log("Created new record of item==========");
							return { code: 200, data: recordCreated };
						})
						.catch(err => {
							console.log("!!!!ERROR:could not create record======", err);
							return { code: 500, data: err };
						});
				}
			})
			.then(itemRecord => {
				// console.log("FINALIZED ITEM RECORD============", itemRecord);
				if (itemRecord.code === 500) {
					return itemRecord;
				}
				return userCollection
					.deleteMany({
						user_id: auth.user_id,
					})
					.then(() => {
						return promiseFcn.recordNewSearchUserCopy(
							userid,
							username,
							useremail,
							userlocation,
							item,
							time,
							searchDate,
						);
					})
					.then(userRecord => {
						// console.log(userRecord);
						return {
							code: 200,
							data: userRecord,
						};
					})
					.catch(err => {
						console.log("Failed to create updated User copy", err);
						return { code: 500, data: err };
					});
			})
			.catch(err => {
				console.log("Failed to finalized updated User copy", err);
				return { code: 500, data: err };
			});
		// console.log(responseData);
		res.status(responseData.code).json(responseData.data);
	} else {
		res
			.status(403)
			.send(
				"Sorry, you are not authorized to access the databased. Please check with Wisejo adminstration.",
			);
	}
});

const conductSearch = async (storeFunction, item, time, userid, store) => {
	//convert EST timestamp to date
	// const dateSubmitted = new Date(time);
	const dateSubmittedEST = new Date(time - 14400000);

	const searchDate = {
		year: dateSubmittedEST.getFullYear(),
		month: dateSubmittedEST.getUTCMonth() + 1,
		day: dateSubmittedEST.getUTCDate(),
	};

	//This counts the number of days since Sunday Midnight.
	//All items are taken from the record if its from any time the same week since Monday.
	//Updates on prices are retrieved on the first time it is requested from Monday 00:00am.
	const daysSince =
		dateSubmittedEST.getUTCDay() === 0
			? dateSubmittedEST.getUTCDay() + 6
			: dateSubmittedEST.getUTCDay() - 1;

	const sundayMidnight = new Date(
		searchDate.year,
		searchDate.month - 1,
		searchDate.day - daysSince,
	);

	//Checks if there is already an up to date(same day) result.
	const responseData = await itemCollection
		.find({
			searchItem: item,
			searchTime: { $gt: sundayMidnight.getTime() },
		})
		.exec()
		.then(existingRecord => {
			// console.log(store, "ITEM IN RECORD:");
			if (existingRecord[0][store].length) {
				// console.log(store, "already has results=======");
				return existingRecord[0];
			} else {
				console.log(store, "has no results for", item);
				return storeFunction
					.store(item)
					.then(storeResult => {
						console.log(store, "Got results from website", storeResult.length);
						// console.log(store, ": Updating item record");
						return itemCollection.findOneAndUpdate(
							{
								searchItem: existingRecord[0].searchItem,
								searchTime: existingRecord[0].searchTime,
							},
							{ [store]: storeResult },
							{ new: true },
						);
					})
					.catch(err => {
						console.log(store, "Did add results", err);
						return {
							code: 404,
							message: "Could not add results to record",
							error: err,
						};
					});
			}
		})
		.then(updatedRecord => {
			return userCollection
				.find({
					user_id: userid,
					searchItem: item,
				})
				.exec()
				.then(results => {
					const userRecord = results[0];
					if (
						updatedRecord.code === 404 ||
						!updatedRecord[store].length ||
						userRecord[store].length
					) {
						return userRecord;
					} else {
						return userCollection.findOneAndUpdate(
							{
								user_id: userid,
								searchItem: item,
								time: userRecord.time,
							},
							{
								[store]: updatedRecord[store],
							},
							{ new: true },
						);
					}
				})
				.catch(err => {
					console.log("Failed to create updated User copy", err);
					return err;
				});
		})
		.then(updatedUserCopy => {
			if (updatedUserCopy) {
				return {
					code: 201,
					jsonData: {
						message: `Updated database for ${item} at ${store}`,
						data: updatedUserCopy,
					},
				};
			} else {
				return {
					code: 400,
					jsonData: {
						message: `Could not update userdata for ${item} at ${store}`,
						data: updatedUserCopy,
					},
				};
			}
		})
		.catch(err => {
			console.log(
				store,
				`500 Had problems with checking history of searches for ${item}.`,
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

express().options("/:store/:time", cors(options));
router.get("/:store/:time", cors(options), async (req, res) => {
	const auth = req.currentUser;
	if (auth) {
		const time = parseInt(req.params.time);
		const item = req.query.item;
		const userid = auth.user_id;
		const store = req.params.store;

		const storeFunction =
			store === "longos"
				? longos
				: store === "sobeys"
				? sobeys
				: store === "walmart"
				? walmart
				: store === "nofrills"
				? nofrills
				: store === "loblaws"
				? loblaws
				: store === "superstore"
				? superstore
				: "n/a";

		const responseData = await conductSearch(
			storeFunction,
			item,
			time,
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
		const record = await userCollection
			.find({
				user_id: auth.user_id,
			})
			.then(res => {
				return res[0];
			})
			.catch(err => {
				console.log(err);
				return [];
			});

		const stores = [
			"loblaws",
			"longos",
			"nofrills",
			"sobeys",
			"superstore",
			"walmart",
		];

		const searchResults = stores.map(store => {
			return record[store];
		});
		const data = { ...record._doc, searchResults };
		res.status(200).json({
			message: "Success! Results retrieved",
			data: data,
		});
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
		userCollection
			.find({
				user_id: auth.user_id,
			})
			.exec()
			.then(result => {
				//Copies the searchResults from the store and removes the item with the itemID.
				const listofItems = result[0][store];
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
				return userCollection.findOneAndUpdate(
					{ user_id: auth.user_id },
					{ [store]: result },
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

router.delete("/capacity/:value/:quantity", async (req, res) => {
	const auth = req.currentUser;
	if (auth) {
		const itemValue = parseInt(req.params.value);
		const itemQuantity = parseInt(req.params.quantity);
		const resultList = await userCollection.find({ user_id: auth.user_id });

		const stores = [
			"loblaws",
			"longos",
			"nofrills",
			"sobeys",
			"superstore",
			"walmart",
		];

		await Promise.all(
			stores.map(async store => {
				const list = resultList[0][store];
				const newList = list.slice(0).filter(item => {
					return item.value !== itemValue || item.quantity !== itemQuantity;
				});
				return userCollection
					.findOneAndUpdate(
						{ user_id: auth.user_id },
						{ [store]: newList },
						{ new: true },
					)
					.then(result => {
						return result;
					})
					.catch(err => {
						return err;
					});
			}),
		).then(result => {
			res.status(200).json(result);
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
