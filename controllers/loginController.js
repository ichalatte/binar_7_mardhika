module.exports = {
  index: (req, res, next) =>
    res.render("login", {
      title: "Login",
      msg: req.query.msg,
      style: "login",
    }),
};
