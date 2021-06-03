const express = require("express");
const app = express();
const cors = require("cors");
const receipts = require("./routes/receipts");
const itemSearch = require("./routes/itemSearch");
const morgan = require("morgan");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 8080;

//middleware
app.use(express.json());
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//HTTP request logger
app.use(morgan("tiny"));

//Mongo DB
mongoose.connect(process.env.MONGODB_URI_ITEMSEARCH, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});
mongoose.connection.on("connected", () => {
	console.log("-----Mongoose is connected to ITEMSEARCH!-----");
});

app.use("/itemSearch", itemSearch);
app.use("/receipts", receipts);

app.listen(PORT, () => {
	console.log(`Capstone server is starting at ${PORT}`);
});
