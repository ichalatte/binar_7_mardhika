module.exports = {
  index: (req, res) =>
    res.render("register", {
      title: "Register",
      userExist: req.query.msg,
      style: "login",
    }),
};
