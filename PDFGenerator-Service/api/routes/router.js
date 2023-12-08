const express = require("express");
const router = express.Router();

const pdfController = require("../controllers/pdfGenerationController");

// Route for POST method to collect transactions
router.post("/collectTransactions", pdfController.generatePDF);

module.exports = router;
