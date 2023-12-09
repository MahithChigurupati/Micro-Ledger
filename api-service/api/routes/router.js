const express = require("express");
const router = express.Router();

const apiController = require("../controllers/apiController");

// Route for GET method to check connection
router.get("/healthz", apiController.healthCheck);

// Route for POST method to generate and mail PDF
router.post("/generatePDF", apiController.generatePDF);

module.exports = router;
