const express = require("express");
const router = express.Router();

const dbController = require("../controllers/dbController");

// Route for GET method to check connection
router.get("/healthz", dbController.healthCheck);

// Route for POST method to filter transactions
router.post("/collectTransactions", dbController.collectTransactions);

module.exports = router;
