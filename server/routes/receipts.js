const express = require("express");
const router = express.Router();
const grocery = require("../receiptFunctions/groceryFunctions");
const receiptsCollection = require("../data/receiptsCollection");
const multer = require("multer");
const fs = require("fs");
var Tesseract = require("tesseract.js");

var Storage = multer.diskStorage({
	destination: function (req, file, callback) {
		callback(null, "uploads/");
	},
	filename: (req, file, callback) => {
		callback(null, Date.now() + ".jpeg");
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
	const time = Date.now();
	const store = req.query.store.toLowerCase();
	console.log("store", store);
	var image = fs.readFileSync(req.file.path, {
		encoding: null,
	});

	console.log("image", image);
	Tesseract.recognize(image)
		.then(result => {
			const results = result.data.text.split(`\n`);

			const purchaseData =
				store === "walmart"
					? grocery.walmartReceipt(results)
					: store === "longo's"
					? grocery.longosReceipt(results)
					: grocery.nofrillsReceipt(results);

			const receiptData = {
				time: time,
				store: store,
				purchaseData: purchaseData,
				results: result.data.text.split(`\n`),
			};

			receiptsCollection.push(receiptData);
			res.status(200).json(receiptsCollection);
		})
		.catch(err => {
			res
				.status(400)
				.send(
					"Sorry could not read the receipt. Please try to take another picture with better focus and contrast.",
					"Error",
					err,
				);
		});
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

module.exports = router;
