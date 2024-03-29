const axios = require("axios");
const Dev = require("../models/Dev");

module.exports = {
  async create(req, res) {
    const { username } = req.body;

    const user = await Dev.findOne({ user: username });
    if (user) {
      return res.json(user);
    }

    const response = await axios.get(`https://api.github.com/users/${username}`);

    const { name, bio, avatar_url: avatar } = response.data;

    const dev = await Dev.create({
      name: name || username,
      user: username,
      bio,
      avatar
    });

    return res.json(dev);
  },

  async list(req, res) {
    const { user } = req.headers;

    const loggedDev = await Dev.findById(user);
    const devs = await Dev.find({
      $and: [{ _id: { $ne: user } }, { _id: { $nin: loggedDev.likes } }, { _id: { $nin: loggedDev.dislikes } }]
    });

    return res.json(devs);
  }
};
