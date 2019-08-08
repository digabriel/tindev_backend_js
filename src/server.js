const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const cors = require("cors");
require("dotenv").config();

const server = express();

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true
});

server.use(cors());
server.use(express.json());
server.use(routes);

server.listen(3333);
