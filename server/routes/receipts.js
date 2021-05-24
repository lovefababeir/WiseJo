const express = require("express");
const router = express.Router();
const walmart = require("../receiptFunctions/walmartReceipt");
const longos = require("../receiptFunctions/longosReceipt");
const receiptsCollection = require("../data/receiptsCollection");
const multer = require("multer");
const fs = require("fs");
const axios = require("axios").default;
require("dotenv").config();
const fcn = require("../receiptFunctions/decodeText");

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

	convertDate = timestamp => {
		let dateSubmitted = new Date(timestamp);
		return {
			month: dateSubmitted.getMonth() + 1,
			day: dateSubmitted.getUTCDate(),
			year: dateSubmitted.getFullYear(),
		};
	};

	const receiptData = {
		time: time,
		id: time,
		date: convertDate(time),
		store: store,
		purchaseData: purchaseData,
		results: convertedText,
	};

	receiptsCollection.push(receiptData);
	console.log(receiptsCollection);
	setTimeout(() => res.status(200).json(receiptsCollection), 2000);
});

router.get("/history", (req, res) => {
	console.log("made a request for history");
	if (receiptsCollection) {
		res.status(200).json(receiptsCollection);
	} else {
		res
			.status(400)
			.send(
				"Sorry no data available. This mean that you have not yet added any receipts to your collection. Please add a receipt",
			);
	}
});

//====================================
//receipt OCR API for when storing the image
//CURRENTLY NOT IN USE=====================//
var Storage = multer.diskStorage({
	destination: function (req, file, callback) {
		callback(null, "uploads/");
	},
	filename: (req, file, callback) => {
		callback(null, req.query.name + ".jpeg");
	},
});

const fileFilter = (req, file, cb) => {
	if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
		cb(null, true);
	} else {
		cb(null, false);
	}
};

const upload = multer({ storage: Storage, fileFilter: fileFilter });

router.post("/upload", upload.single("receipt"), (req, res) => {
	const name = req.query.name;
	console.log(name);
	const store = req.query.store.toLowerCase();
	console.log("store", store);
	var image = fs.readFileSync(req.file.path, {
		encoding: null,
	});

	//=============
	axios
		.post(`${process.env.OCR_ENDPOINT}vision/v3.2/ocr`, req.file.image, {
			headers: {
				"content-type": "application/json",
				"Ocp-Apim-Subscription-Key": process.env.OCR_API_KEY_1,
			},
		})
		.then(res => {
			console.log(res);
		})
		.catch(err => console.log(err.response));
	//=================================
	//VISION API
	// async function readText(pic) {
	// 	const [result] = await client.textDetection(pic);
	// 	const detections = result.textAnnotations;
	// 	console.log("Text:");
	// 	// detections.forEach(text => console.log(text));
	// 	console.log(detections[0].description);
	// }
	// readText(image);
});
//CURRENTLY NOT IN USE=====================//

module.exports = router;
