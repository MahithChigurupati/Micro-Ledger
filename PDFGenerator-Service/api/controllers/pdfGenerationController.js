const PDFDocument = require("pdfkit");

const healthCheck = async (req, res) => {
  res.send("Connection established successfully from PDF Generator.");
};

const generatePDF = (transactions, res) => {
  // Create a new PDF document
  const doc = new PDFDocument();

  // Set response headers for PDF download
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", "attachment; filename=transactions.pdf");

  // Pipe the PDF output to the response stream
  doc.pipe(res);

  // Add content to the PDF
  doc.fontSize(14).text("Transaction List", { align: "center" });
  doc.moveDown();

  // Create a table with headers
  const tableHeaders = ["Date", "Amount"];
  doc.table({
    headers: tableHeaders,
    rows: transactions.map((transaction) => [
      transaction.date_of_transaction.toDateString(),
      `$${transaction.amount.toFixed(2)}`,
    ]),
    widths: [150, 150], // Adjust column widths as needed
  });

  // End the PDF document
  doc.end();
};

module.exports = {
  healthCheck,
  generatePDF,
};
