const amqp = require("amqplib");
const { collectTransactions } = require("../controllers/dbController");

const { publishToQueue } = require("./publisher");

async function connectRabbitMQ() {
  const connection = await amqp.connect("amqp://localhost");
  return connection;
}

async function consumeMessages(queue) {
  const connection = await connectRabbitMQ();
  const channel = await connection.createChannel();

  await channel.assertQueue(queue, { durable: false });

  console.log(`[*] Waiting for messages in ${queue}`);

  channel.consume(queue, async (msg) => {
    if (msg !== null) {
      console.log(`[x] Received: ${msg.content.toString()}`);
      const { userEmail, fromDate, toDate } = JSON.parse(
        msg.content.toString()
      );

      try {
        const transactions = await collectTransactions(
          userEmail,
          new Date(fromDate),
          new Date(toDate)
        );

        if (transactions && transactions.length > 0) {
          // Publish transactions data to the new queue for PDF generation
          await publishToQueue("pdfGenerationQueue", {
            userEmail,
            transactions,
          });
        }

        channel.ack(msg);
      } catch (error) {
        console.error("Error processing transactions:", error);
      }
    }
  });
}

module.exports = consumeMessages;
