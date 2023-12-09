const app = require("./api/app.js");

require("dotenv").config();

const PORT = `${process.env.PORT}`;

const consumeMessages = require("./api/messageQueue/consumer.js");

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);

  // Initiate the RabbitMQ consumer
  const queueName = "emailQueue";
  consumeMessages(queueName)
    .then(() => {
      console.log(`Consumer listening on queue ${queueName}`);
    })
    .catch((error) => {
      console.error("Failed to start the consumer:", error);
    });
});
