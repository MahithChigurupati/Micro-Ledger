const express = require("express");
const router = express.Router();

const healthController = require("../api/controllers/health");

// Route for GET method to check connection
router.get("/healthz", healthController.healthCheck);

module.exports = router;
