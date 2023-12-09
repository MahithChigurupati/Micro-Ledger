const amqp = require("amqplib");
const { generatePDF } = require("../controllers/pdfGenerationController");

const { publishToQueue } = require("./publisher");

async function consumeMessages(queue) {
  const connection = await amqp.connect("amqp://localhost");
  const channel = await connection.createChannel();
  await channel.assertQueue(queue, { durable: false });

  console.log(`[*] Waiting for messages in ${queue}`);

  channel.consume(queue, (msg) => {
    if (msg) {
      const messageData = JSON.parse(msg.content.toString());

      if (messageData.transactions && messageData.userEmail) {
        generatePDF(messageData.transactions, messageData.userEmail)
          .then(async (pdfPath) => {
            console.log(`PDF generated: ${pdfPath}`);
            // Prepare the data for the email queue
            const emailData = {
              userEmail: messageData.userEmail,
              pdfPath: pdfPath,
            };

            const emailQueue = "emailQueue";

            // Publish the PDF path and user email to the email service queue
            await publishToQueue(emailQueue, emailData);
          })
          .catch((error) => console.error("Error in PDF generation:", error));
      } else {
        console.error("Invalid message format");
      }

      channel.ack(msg);
    }
  });
}

module.exports = consumeMessages;
