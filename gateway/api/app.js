//importing and initializing express app
const express = require("express");
const proxy = require("express-http-proxy");

const router = require("../routes/router");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/db", proxy("http://localhost:8080"));
app.use("/pdf", proxy("http://localhost:8081"));
app.use("/email", proxy("http://localhost:8082"));
app.use("/", router);

//for all other invalid routes
app.use("*", (req, res) => {
  res.status(400).send("Invalid route");
});

module.exports = app;
