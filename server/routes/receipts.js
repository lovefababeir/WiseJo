const express = require("express");
const router = express.Router();
const walmart = require("../receiptFunctions/walmartReceipt");
const longos = require("../receiptFunctions/longosReceipt");
const nofrills = require("../receiptFunctions/nofrillsReceipt");
require("dotenv").config();
const fcn = require("../receiptFunctions/decodeText");
const ReceiptDoc = require("../models/receipt");
const mongoose = require("mongoose");

router.post("/convertImage", (req, res) => {
	const auth = req.currentUser;
	if (auth) {
		const store = req.query.store.toLowerCase();
		console.log(store);
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

		const receiptData = {
			_id: mongoose.Types.ObjectId(),
			user_id: auth.user_id,
			time: time,
			receiptID: time,
			date: convertDate(time),
			store: store,
			purchaseData: purchaseData,
			results: convertedText,
		};

		const newReceipt = new ReceiptDoc(receiptData);
		newReceipt.save().then(result => {
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

router.get("/history", (req, res) => {
	const auth = req.currentUser;

	if (auth) {
		ReceiptDoc.find({ user_id: auth.user_id })
			.exec()
			.then(result => {
				res.status(200).json(result);
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
		const updatedReceipt = new ReceiptDoc(req.body.receiptData);
		ReceiptDoc.findOneAndUpdate(
			{ receiptID: updatedReceipt.receiptID, user_id: auth.user_id },
			updatedReceipt,
			{ new: true },
		)
			.then(() => {
				return ReceiptDoc.find({ user_id: auth.user_id })
					.exec()
					.then(result => {
						return result;
					})
					.catch(err => {
						res.status(400).json(err);
					});
			})
			.then(result => {
				res.status(200).json(result);
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
		ReceiptDoc.deleteOne({ receiptID: deleteReceiptID, user_id: auth.user_id })
			.then(result => {
				return ReceiptDoc.find({ user_id: auth.user_id })
					.exec()
					.then(result => {
						return result;
					});
			})
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
