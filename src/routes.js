const express = require("express");
const routes = express.Router();
const DevController = require("./controllers/DevController");
const LikeController = require("./controllers/LikeController");

routes.get("/devs", DevController.list);
routes.post("/devs", DevController.create);

routes.post("/devs/:devId/likes", LikeController.like);
routes.post("/devs/:devId/dislikes", LikeController.dislike);

module.exports = routes;
