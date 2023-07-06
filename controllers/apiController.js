const {
  User_game,
  User_game_biodata,
  User_game_history,
  Game,
} = require("../models");

module.exports = {
  all_user: async (req, res) =>
    await User_game.findAll({
      include: [
        {
          model: User_game_biodata,
        },
        {
          model: User_game_history,
        },
      ],
    }).then((user) =>
      user.length == 0
        ? res.status(200).send("Belum ada user!!")
        : res.status(200).json(user)
    ),

  user: async (req, res) =>
    await User_game.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: User_game_biodata,
        },
        {
          model: User_game_history,
        },
      ],
    }).then((user) =>
      user ? res.status(200).json(user) : res.status(200).send("ID tidak ditemukan")
    ),

  update_user: async (req, res) =>
    await User_game.update(
      {
        username: req.body.username,
        password: req.body.password,
      },
      { where: { id: req.params.id } }
    )
      .then(async (user) => {
        await User_game_biodata.update(
          {
            full_name: req.body.full_name,
            email: req.body.email,
          },
          { where: { user_id: req.params.id } }
        );
        await User_game_history.update(
          {
            win: req.body.win,
            lose: req.body.lose,
            score: req.body.score,
          },
          { where: { user_id: req.params.id } }
        );

        res.status(201).send({
          message: `Users id of ${req.params.id} telah di update!!`,
        });
      })
      .catch(() => res.status(422).send("tidak bisa update user!!")),

  delete_user: async (req, res) =>
    await User_game.destroy({ where: { id: req.params.id } })
      .then(() =>
        res.status(201).json({
          message: `Users ${req.params.id} telah di hapus!!`,
        })
      )
      .catch(() => res.status(422).send("tidak bisa update user!")),

  login: async (req, res) => {
    if (req.user) {
      res.send({
        code: 200,
        message: "Log in sukses!!",
        user: req.user,
      });
    } else {
      await User_game.authenticate(req.body)
        .then((user) =>
          res.send({
            code: 200,
            message: "Log in sukses !",
            user,
          })
        )
        .catch((err) =>
          res.status(400).send({
            status: "error",
            message: "Cek pasword dan username",
          })
        );
    }
  },

  register: async (req, res, next) =>
    req.body.username != null && req.body.password != null
      ? await User_game.register(req.body)
          .then((user) => {
            User_game_biodata.create({
              user_id: user.get("id"),
            });
            User_game_history.create({
              user_id: user.get("id"),
            });
            res.send(user);
          })
          .catch((err) => res.status(400).send(`Error : ${err}`))
      : res.send({
          code: 400,
          status: "error",
          message: "Masukkan password dan username",
        }),

  whoami: async (req, res) => await res.json(req.user),

  all_room: async (req, res) =>
    await Game.findAll({
      order: [["id", "ASC"]],
    }).then((game) => res.status(200).send(game)),

  room: async (req, res, next) => {
    await Game.findOne({
      where: {
        room: req.params.room,
      },
    }).then((game) => {
      game
        ? res.send(game)
        : res.status(400).send({
            status: "error",
            message: "Room tidak ditemukan",
          });
    });
  },

  create_room: async (req, res) =>
    await User_game.findOne({ where: { username: req.body.username } })
      .then(
        async (user) =>
          await Game.create({
            player_one: user.username,
            room: req.body.room,
          })
            .then((game) =>
              res.send({
                code: 200,
                message: "Room sukses dibuat !",
                game,
              })
            )
            .catch((err) =>
              res.status(400).send({
                status: "error",
                message: "Room sudah ada, gunakan ID lain",
              })
            )
      )
      .catch((err) =>
        res.status(400).send({
          status: "error",
          message: "Username tidak ditemukan",
        })
      ),

  join: async (req, res, next) => {
    const roomId = req.params.room;
    const player = await User_game.findOne({
      where: { username: req.body.username },
    });

    if (player) {
      const room = await Game.findOne({ where: { room: roomId } });
      if (
        room.player_one == player.username ||
        room.player_two == player.username
      ) {
        res.send({
          code: 400,
          status: "error",
          message: `Player ${player.username} sudah masuk.`
        });
      } else {
        await Game.update(
          {
            player_two: player.username,
          },
          { where: { room: roomId } }
        ).then(() =>
          res.send({
            code: 200,
            message: `Player ${player.username} masuk keruangan.`,
          })
        );
      }
    } else {
      res.status(400).send({
        status: "error",
        message: "User tidak ditemukan",
      });
    }
  },
};
