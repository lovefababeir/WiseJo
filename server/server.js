const express = require("express");
const app = express();
const cors = require("cors");
const receipts = require("./routes/receipts");
const itemSearch = require("./routes/itemSearch");
const PORT = process.env.PORT || 8080;
//middleware
app.use(express.json());
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use("/itemSearch", itemSearch);
app.use("/receipts", receipts);

app.listen(PORT, () => {
	console.log("Capstone");
});
