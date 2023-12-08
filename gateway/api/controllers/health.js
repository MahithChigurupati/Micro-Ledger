const healthCheck = async (req, res) => {
  res.send("Connection established successfully.");
};

module.exports = {
  healthCheck,
};
