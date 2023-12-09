const amqp = require("amqplib");
const { sendEmail } = require("../controllers/emailController");

async function consumeEmailQueue(queue) {
  const connection = await amqp.connect("amqp://localhost");
  const channel = await connection.createChannel();
  await channel.assertQueue(queue, { durable: false });

  console.log(`[*] Waiting for messages in ${queue}. To exit press CTRL+C`);

  channel.consume(queue, async (msg) => {
    if (msg) {
      const { userEmail, pdfPath } = JSON.parse(msg.content.toString());
      console.log("Received email job:", userEmail, pdfPath);

      try {
        await sendEmail(userEmail, pdfPath);
        console.log(`Email sent to ${userEmail} with PDF: ${pdfPath}`);
      } catch (error) {
        console.error(`Error sending email to ${userEmail}:`, error);
      } finally {
        channel.ack(msg);
      }
    }
  });
}

const queueName = "emailQueue";

module.exports = consumeEmailQueue;
