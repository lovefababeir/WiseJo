const express = require("express");
const app = express();
const cors = require("cors");
const receipts = require("./routes/receipts");
const itemSearch = require("./routes/itemSearch");

//middleware
app.use(express.json());
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use("/itemSearch", itemSearch);
app.use("/receipts", receipts);

app.listen(5000, () => {
	console.log("Capstone");
});
