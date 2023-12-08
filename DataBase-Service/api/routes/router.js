const express = require("express");
const router = express.Router();

const dbController = require("../controllers/dbController");

// Route for POST method to collect transactions
router.post("/collectTransactions", dbController.collectTransactions);

module.exports = router;
