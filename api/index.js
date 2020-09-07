const express = require("express");
const app = express();
const path = require("path");

const PORT = 4000;
module.exports = app;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", require("./routes")); // include our routes!
