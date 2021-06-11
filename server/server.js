const express = require("express");
const app = express();
const cors = require("cors");
const receipts = require("./routes/receipts");
const itemSearch = require("./routes/itemSearch");
const mongoose = require("mongoose");
const decodeIDToken = require("./authenticateToken.js");
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 8080;

//Mongo DB
mongoose.connect(process.env.MONGODB_URI_ITEMSEARCH, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});
mongoose.connection.on("connected", () => {
	console.log("-----Mongoose is connected to ITEMSEARCH!-----");
});

//middleware
app.use(express.json());
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//Athenticate token with firebase
app.use(decodeIDToken);

app.use("/itemSearch", itemSearch);
app.use("/receipts", receipts);

const server = app.listen(PORT, () => {
	console.log(`Wisejo server is starting at ${PORT}`);
});

process.on("unhandledRejection", err => {
	console.log("Unhandled rejection! FORCING SHUT DOWN");
	console.log(err.name, err.message);
	server.close(() => {
		console.log("Process terminated");
	});
});

process.on("SIGTERM", () => {
	console.log("SIGTERM RECEIVED. Shutting down gracefully");
	server.close(() => {
		console.log("Process Terminated!");
	});
});
