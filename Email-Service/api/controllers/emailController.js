const nodemailer = require("nodemailer");

const healthCheck = async (req, res) => {
  res.send("Connection established successfully to Email Service.");
};

const sendEmail = async (userEmail, pdfFilePath) => {
  try {
    // Create a transporter using the default SMTP transport
    const transporter = nodemailer.createTransport({
      service: `${process.env.EMAIL_SERVICE_PROVIDER}`,
      auth: {
        user: `${process.env.EMAIL}`,
        pass: `${process.env.PASSWORD}`,
      },
    });

    // Define email data
    const mailOptions = {
      from: `${process.env.EMAIL}`,
      to: userEmail,
      subject: "Transaction Report",
      text: "Please find attached the transaction report.",
      attachments: [
        {
          filename: "transactions.pdf",
          path: pdfFilePath,
        },
      ],
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);

    console.log("Email sent:", info.response);
  } catch (error) {
    console.error("Email error:", error);
  }
};

module.exports = {
  healthCheck,
  sendEmail,
};
