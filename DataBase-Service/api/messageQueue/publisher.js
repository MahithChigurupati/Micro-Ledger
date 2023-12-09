const amqp = require("amqplib");

const publishToQueue = async (queue, data) => {
  const connection = await amqp.connect("amqp://localhost");
  const channel = await connection.createChannel();

  await channel.assertQueue(queue, { durable: false });
  channel.sendToQueue(queue, Buffer.from(JSON.stringify(data)));

  console.log(`[x] Sent data to ${queue}`);

  setTimeout(() => {
    connection.close();
  }, 500);
};

module.exports = { publishToQueue };
