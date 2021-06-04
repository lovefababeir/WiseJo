const express = require("express");
const router = express.Router();
const walmart = require("../receiptFunctions/walmartReceipt");
const longos = require("../receiptFunctions/longosReceipt");
require("dotenv").config();
const fcn = require("../receiptFunctions/decodeText");
const ReceiptDoc = require("../models/receipt");
const mongoose = require("mongoose");

router.post("/convertImage", (req, res) => {
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
});

router.get("/history", (req, res) => {
	ReceiptDoc.find()
		.exec()
		.then(result => {
			res.status(200).json(result);
		})
		.catch(err => {
			res.status(400).json(err);
		});
});

router.patch("/receiptData", (req, res) => {
	console.log("Requested to change a receipt:");
	console.log(req.body.receiptData);
	const updatedReceipt = new ReceiptDoc(req.body.receiptData);

	ReceiptDoc.findOneAndUpdate(
		{ receiptID: updatedReceipt.receiptID },
		updatedReceipt,
		{ new: true },
	)
		.then(result => {
			return ReceiptDoc.find()
				.exec()
				.then(result => {
					return result;
				})
				.catch(err => {
					console.log("could not find list", err);
					res.status(400).send("error");
				});
		})
		.then(result => {
			res.status(200).json(result);
		})
		.catch(err => {
			console.log("could not replace receipt");
			res.status(400).send("error");
		});
});

module.exports = router;
