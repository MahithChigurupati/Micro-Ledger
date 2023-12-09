const fs = require("fs");
const path = require("path");
const PDFDocument = require("pdfkit");

const healthCheck = async (req, res) => {
  res.send("Connection established successfully from PDF Generator.");
};

const generatePDF = async (transactions, userEmail) => {
  return new Promise((resolve, reject) => {
    const basePdfDir = path.join(__dirname, "../../../PDFs");

    // Create a directory path for the specific user
    const userPdfDir = path.join(basePdfDir, userEmail);

    if (!fs.existsSync(userPdfDir)) {
      fs.mkdirSync(userPdfDir, { recursive: true });
    }

    const pdfFileName = `Statement_${Date.now()}.pdf`;
    const pdfPath = path.join(userPdfDir, pdfFileName);

    // Create a new PDF document
    const doc = new PDFDocument();
    const stream = fs.createWriteStream(pdfPath);
    doc.pipe(stream);

    doc.fontSize(14).text("Transaction List", { align: "center" });
    doc.moveDown();

    // Add transactions to the PDF
    transactions.forEach((transaction) => {
      const transactionDate = new Date(
        transaction.date_of_transaction
      ).toDateString();
      doc.text(
        `Date: ${transactionDate}, Amount: $${transaction.amount.toFixed(2)}`
      );
      doc.moveDown();
    });

    doc.end();

    // Resolve the promise once the file stream is finished
    stream.on("finish", () => {
      console.log(`PDF generated at: ${pdfPath}`);
      resolve(pdfPath); // Resolve with the path to the generated PDF
    });

    // Handle any errors
    stream.on("error", (error) => {
      console.error("Error generating PDF:", error);
      reject(error); // Reject the promise if there's an error
    });
  });
};

module.exports = {
  healthCheck,
  generatePDF,
};
