const express = require("express");
const router = express.Router();
const grocery = require("../receiptFunctions/groceryFunctions");
const receiptsCollection = require("../data/receiptsCollection");
const multer = require("multer");
const fs = require("fs");
var Tesseract = require("tesseract.js");
const vision = require("@google-cloud/vision");
const client = new vision.ImageAnnotatorClient({
	keyFilename: "wisejo-ea0d54e05e6c.json",
});

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
	// const fileName = "/uploads/1621555926078.jpg";
	var image = fs.readFileSync(req.file.path, {
		encoding: null,
	});

	async function readText(pic) {
		const [result] = await client.textDetection(pic);
		const detections = result.textAnnotations;
		console.log("Text:");
		// detections.forEach(text => console.log(text));
		console.log(detections[0].description);
	}
	readText(image);
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
