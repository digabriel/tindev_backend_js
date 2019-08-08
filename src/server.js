const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const cors = require("cors");
require("dotenv").config();

const server = express();

server.use(cors());
server.use(express.json());
server.use(routes);

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true }, err => {
  if (err) {
    return console.error("Cant connect to mongoose...");
  }

  const port = process.env.PORT || 3333;
  server.listen(port, () => {
    console.log(`Server running on PORT ${port}...`);
  }).on("error", e => {
    console.error(`Error starting server: ${e}`);
  });
});
