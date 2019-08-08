const Dev = require("../models/Dev");
const mongoose = require("mongoose");

async function likeAction(req, res, isLike) {
  const { devId } = req.params;
  const { user } = req.headers;

  if (!mongoose.Types.ObjectId.isValid(devId) || !mongoose.Types.ObjectId.isValid(user)) {
    return res.status(400).json({ error: "Bad request" });
  }

  const loggedDev = await Dev.findById(user);
  const targetDev = await Dev.findById(devId);

  if (!targetDev) {
    return res.status(404).json({ error: "Target dev not found" });
  }

  if (isLike) {
    if (targetDev.likes.includes(user)) {
      console.log("MATCH");
    }

    loggedDev.likes.push(targetDev._id);
  } else {
    loggedDev.dislikes.push(targetDev._id);
  }

  await loggedDev.save();
  return res.json(loggedDev);
}

module.exports = {
  async like(req, res) {
    return likeAction(req, res, true);
  },

  async dislike(req, res) {
    return likeAction(req, res, false);
  }
};
