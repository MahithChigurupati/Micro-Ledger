const amqp = require("amqplib");

async function publishToQueue(queue, data) {
  const connection = await amqp.connect("amqp://localhost");
  const channel = await connection.createChannel();

  await channel.assertQueue(queue, { durable: false });
  channel.sendToQueue(queue, Buffer.from(JSON.stringify(data)));

  console.log(`[x] Sent ${JSON.stringify(data)} to queue ${queue}`);

  await channel.close();
  await connection.close();
}

module.exports = { publishToQueue };
