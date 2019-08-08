const express = require("express");
const routes = express.Router();
const DevController = require("./controllers/DevController");
const LikeController = require("./controllers/LikeController");
const DislikeController = require("./controllers/DislikeController");

routes.get("/", (req, res) => {
  return res.json({ message: "Hello fuckers!" });
});

routes.get("/devs", DevController.list);
routes.post("/devs", DevController.create);

routes.post("/devs/:devId/likes", LikeController.create);
routes.post("/devs/:devId/dislikes", DislikeController.create);

module.exports = routes;
