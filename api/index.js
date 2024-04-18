const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const usuario = require("./routes/usuario");
const vendedor = require("./routes/vendedor");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGO_URI)

app.use("/api/usuario", usuario);
app.use("/api/vendedor", vendedor);

const port = 8000;
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});