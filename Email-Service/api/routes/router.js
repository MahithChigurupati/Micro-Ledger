const express = require("express");
const router = express.Router();

const emailController = require("../controllers/emailController");

// Route for GET method to check connection
router.get("/healthz", emailController.healthCheck);

// Route for POST method to Send Email
router.post("/collectTransactions", emailController.sendEmail);

module.exports = router;
