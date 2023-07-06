const { Game } = require("../models");
module.exports = {
  index: async (req, res) =>
    await Game.findAll({
      order: [["id", "ASC"]],
      limit: 10,
    }).then((game) =>
      res.status(200).render("roomList", {
        title: "List",
        style: "dashboard",
        name: req.query.user,
        game,
      })
    ),
};
