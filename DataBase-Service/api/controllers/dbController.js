const fs = require("fs");
const csv = require("csv-parser");

// Import the path module
const path = require("path");

const currentDir = __dirname;

// Define the relative path to the CSV file from the script's directory
const csvFilePath = path.join(currentDir, "../model/transactions.csv");

const healthCheck = async (req, res) => {
  res.send("Connection established successfully from DB.");
};

const collectTransactions = (userEmail, fromDate, toDate) => {
  return new Promise((resolve, reject) => {
    const transactions = [];

    console.log(csvFilePath);

    // Read the CSV file
    fs.createReadStream(csvFilePath)
      .pipe(csv())
      .on("data", (row) => {
        // Parse the date_of_transaction as a Date object
        const transactionDate = new Date(row.date_of_transaction);

        console.log("do");
        // Check if the transaction is within the specified date range
        if (
          row.user_email === userEmail &&
          transactionDate >= fromDate &&
          transactionDate <= toDate
        ) {
          transactions.push({
            user_email: row.user_email,
            date_of_transaction: transactionDate,
            amount: parseFloat(row.amount),
          });
        }
      })
      .on("end", () => {
        if (transactions.length === 0) {
          // No matches found
          resolve({
            message: "No transactions found for the specified criteria.",
          });
        } else {
          // Matches found
          resolve(transactions);
        }
      })
      .on("error", (error) => {
        reject(error);
      });
  });
};

module.exports = {
  healthCheck,
  collectTransactions,
};
