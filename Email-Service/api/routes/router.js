const express = require("express");
const router = express.Router();

const emailController = require("../controllers/emailController");

// Route for POST method to collect transactions
router.post("/collectTransactions", emailController.sendEmail);

module.exports = router;
