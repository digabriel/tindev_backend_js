const Dev = require("../models/Dev");
const mongoose = require("mongoose");

module.exports = {
  async create(req, res) {
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

    loggedDev.dislikes.push(targetDev._id);
    await loggedDev.save();

    return res.json(loggedDev);
  }
};
