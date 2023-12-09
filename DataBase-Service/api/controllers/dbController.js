const fs = require("fs");
const csv = require("csv-parser");
const path = require("path");

const healthCheck = async (req, res) => {
  res.send("Connection established successfully from DB.");
};

const collectTransactions = (userEmail, fromDate, toDate) => {
  return new Promise((resolve, reject) => {
    const transactions = [];

    const currentDir = __dirname;

    const csvFilePath = path.join(currentDir, "../model/transactions.csv");

    // Read the CSV file
    fs.createReadStream(csvFilePath)
      .pipe(csv())
      .on("data", (row) => {
        // Parse the date_of_transaction as a Date object
        const transactionDate = new Date(row.date_of_transaction);

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
