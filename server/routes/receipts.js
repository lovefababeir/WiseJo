const express = require("express");
const router = express.Router();
const walmart = require("../receiptFunctions/walmartReceipt");
const longos = require("../receiptFunctions/longosReceipt");
const nofrills = require("../receiptFunctions/nofrillsReceipt");
const dollarama = require("../receiptFunctions/dollaramaReceipt");
require("dotenv").config();
const fcn = require("../receiptFunctions/decodeText");
const UserRecord = require("../models/receipts");
const mongoose = require("mongoose");

router.post("/convertImage", async (req, res) => {
	const auth = req.currentUser;

	if (auth) {
		const store = req.query.store.toLowerCase();
		const time = parseInt(req.query.time);
		const convertedText =
			store === "no frills"
				? fcn.decodeText1(req.body.data.regions)
				: fcn.decodeText2(req.body.data.regions);
		let purchaseData;
		if (store === "walmart") {
			purchaseData = walmart.receipt(convertedText);
		} else if (store === "longo's") {
			purchaseData = longos.receipt(convertedText);
		} else if (store === "no frills") {
			purchaseData = nofrills.receipt(convertedText);
		} else if (store === "dollarama") {
			purchaseData = dollarama.receipt(convertedText);
		} else {
			purchaseData = `Unforunately, there is no algorithm for the ${store} receipts.  Please stay tuned for updates.`;
		}

		convertDate = timestamp => {
			let dateSubmitted = new Date(timestamp);
			return {
				day: dateSubmitted.getDate(),
				month: dateSubmitted.getMonth() + 1,
				year: dateSubmitted.getFullYear(),
			};
		};

		const newReceipt = {
			time: time,
			receiptID: time,
			date: convertDate(time),
			store: store,
			purchaseData: purchaseData,
			results: convertedText,
		};

		UserRecord.findOneAndUpdate(
			{ user_id: auth.user_id },
			{
				user_id: auth.user_id,
				user_name: auth.name || "",
				user_email: auth.email || "",
			},
			{ upsert: true, new: true },
		)
			.then(record => {
				let update;

				if (!record.receipts?.length) {
					update = { receipts: [newReceipt] };
				} else {
					const receiptList = record.receipts;
					receiptList.push(newReceipt);
					update = { receipts: receiptList };
				}
				return UserRecord.findOneAndUpdate({ user_id: auth.user_id }, update, {
					new: true,
				})
					.then(result => {
						return result;
					})
					.catch(err => {
						console.log("Could not update array", err);
					});
			})
			.then(result => {
				res.status(200).json(result);
			})
			.catch(err => {
				console.log("Could not update", err);
				res.status(500).send("Sorry could not add your receipt");
			});
	} else {
		res
			.status(403)
			.send(
				"Sorry, you are not authorized to access the databased. Please check with Wisejo adminstration.",
			);
	}
});

router.get("/list", (req, res) => {
	const auth = req.currentUser;

	if (auth) {
		UserRecord.find({ user_id: auth.user_id })
			.exec()
			.then(result => {
				res.status(200).json(result[0].receipts);
			})
			.catch(err => {
				res.status(400).json(err);
			});
	} else {
		res
			.status(403)
			.send(
				"Sorry, you are not authorized to access the databased. Please check with Wisejo adminstration.",
			);
	}
});

router.patch("/receiptData", (req, res) => {
	const auth = req.currentUser;

	if (auth) {
		const updatedReceipt = req.body.receiptData;
		UserRecord.find({ user_id: auth.user_id })
			.exec()
			.then(result => {
				const list = result[0].receipts;
				const receiptIndex = list.findIndex(item => {
					return item.receiptID === updatedReceipt.receiptID;
				});

				list.splice(receiptIndex, 1, updatedReceipt);
				return list;
			})
			.then(list => {
				return UserRecord.findOneAndUpdate(
					{ user_id: auth.user_id },
					{ receipts: list },
					{ new: true },
				);
			})
			.then(newDoc => {
				res.status(200).json(newDoc);
			})
			.catch(() => {
				res.status(400).json(error);
			});
	} else {
		res
			.status(403)
			.send(
				"Sorry, you are not authorized to access the databased. Please check with Wisejo adminstration.",
			);
	}
});

router.delete("/receipt/:id", (req, res) => {
	const deleteReceiptID = req.params.id;
	const auth = req.currentUser;
	if (auth) {
		UserRecord.find({ user_id: auth.user_id })
			.exec()
			.then(result => {
				const receiptIndex = result[0].receipts.findIndex(
					r => r.receiptID === deleteReceiptID,
				);
				const list = result[0].receipts;
				list.splice(receiptIndex, 1);
				return list;
			})
			.then(list => {
				return UserRecord.findOneAndUpdate(
					{ user_id: auth.user_id },
					{ receipts: list },
					{ new: true },
				);
			})
			.then(result => {
				res.status(200).json(result.receipts);
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
