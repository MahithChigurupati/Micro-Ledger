const express = require("express");

const router = require("./routes/router.js");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", router);

//for all other invalid routes
app.use("*", (req, res) => {
  res.status(400).send("Invalid route");
});

module.exports = app;
