const app = require("./api/app.js");

require("dotenv").config();

const PORT = `${process.env.PORT}`;

app.listen(PORT, () => {
  console.log(`running on port ${PORT}`);
});
