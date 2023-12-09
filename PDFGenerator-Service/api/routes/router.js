const express = require("express");
const router = express.Router();

const pdfController = require("../controllers/pdfGenerationController");

// Route for GET method to check connection
router.get("/healthz", pdfController.healthCheck);

// Route for POST method to generate PDF
router.post("/collectTransactions", pdfController.generatePDF);

module.exports = router;
