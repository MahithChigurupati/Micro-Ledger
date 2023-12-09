const moment = require("moment");
const publishMessage = require("../messageQueue/publisher");

const healthCheck = async (req, res) => {
  res.send("Connection established successfully from API.");
};

const generatePDF = async (req, res) => {
  // Extract data from request body
  const { fromDate, toDate, userEmail } = req.body;

  // Validate email address
  if (!userEmail || !/^\S+@\S+\.\S+$/.test(userEmail)) {
    return res.status(400).send("Invalid or missing email address.");
  }

  // Validate dates
  if (!fromDate || !toDate) {
    return res.status(400).send("Both fromDate and toDate are required.");
  }

  // Check if dates are in correct format
  if (
    !moment(fromDate, "YYYY-MM-DD", true).isValid() ||
    !moment(toDate, "YYYY-MM-DD", true).isValid()
  ) {
    return res.status(400).send("Invalid date format. Use YYYY-MM-DD.");
  }

  // Check if fromDate is before toDate
  if (moment(fromDate).isAfter(moment(toDate))) {
    return res.status(400).send("fromDate must be before toDate.");
  }

  try {
    await publishMessage("getTxs", req.body);
    res.send("Request received and message sent to RabbitMQ");
  } catch (error) {
    console.error("Error publishing message:", error);
    res.status(500).send("Failed to send message to RabbitMQ");
  }
};

module.exports = {
  healthCheck,
  generatePDF,
};
