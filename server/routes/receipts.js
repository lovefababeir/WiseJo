const express = require("express");
const router = express.Router();
const walmart = require("../receiptFunctions/walmartReceipt");
const longos = require("../receiptFunctions/longosReceipt");
require("dotenv").config();
const fcn = require("../receiptFunctions/decodeText");
const ReceiptDoc = require("../models/receipt");
const mongoose = require("mongoose");

router.post("/convertImage", (req, res) => {
	const auth = req.currentUser;
	if (auth) {
		const store = req.query.store.toLowerCase();
		const time = parseInt(req.query.time);
		const convertedText = fcn.decodeText(req.body.data.regions);
		let purchaseData;
		if (store === "walmart") {
			purchaseData = walmart.receipt(convertedText);
		} else if (store === "longo's") {
			purchaseData = longos.receipt(convertedText);
		} else if (store === "no frills") {
			purchaseData =
				"Sorry, algorithm for reading No Frills receipts is currently not working";
		} else {
			purchaseData = `Sorry, algorithm for reading ${store} receipts is currently not working`;
		}

		const timeEST = time - 3600000 * 4;
		convertDate = timestamp => {
			let dateSubmitted = new Date(timestamp);
			return {
				day: dateSubmitted.getUTCDate(),
				month: dateSubmitted.getMonth() + 1,
				year: dateSubmitted.getFullYear(),
			};
		};

		const receiptData = {
			_id: mongoose.Types.ObjectId(),
			user_id: auth.user_id,
			time: timeEST,
			receiptID: timeEST,
			date: convertDate(timeEST),
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
						console.log("could not find list", err);
						res.status(400).json(err);
					});
			})
			.then(result => {
				res.status(200).json(result);
			})
			.catch(() => {
				console.log("could not replace receipt");
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
				console.log(err);
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
