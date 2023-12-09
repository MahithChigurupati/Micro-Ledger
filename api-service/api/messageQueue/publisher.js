const amqp = require("amqplib");

async function connectRabbitMQ() {
  const connection = await amqp.connect("amqp://localhost");
  return connection;
}

async function publishMessage(queue, message) {
  const connection = await connectRabbitMQ();
  const channel = await connection.createChannel();

  await channel.assertQueue(queue, { durable: false });
  channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));

  console.log(`[x] Sent ${JSON.stringify(message)}`);

  setTimeout(() => {
    connection.close();
  }, 500);
}

module.exports = publishMessage;
