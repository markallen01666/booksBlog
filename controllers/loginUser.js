// authenticate user - controller

const bcrypt = require("bcrypt");
const User = require("../models/User");

module.exports = (req, res) => {
  const { username, password } = req.body;

  if (password != null && password != "") {
    User.findOne({ username: username }, (error, user) => {
      if (user) {
        // user exists
        bcrypt.compare(password, user.password, (error, same) => {
          if (same) {
            // password match
            req.session.userId = user._id;
            loggedInUsername = username;
            res.redirect("/");
          } else {
            errorFunction(req, res)
          }
        });
      } else {
        errorFunction(req, res)
      }
    });
  } else {
    errorFunction(req, res)
  }
};

const errorFunction = function(req, res) {
    const validationErrors = ["Invalid user name or password"];
    req.flash("validationErrors", validationErrors);
    req.flash("data", req.body);
    res.redirect("/auth/login");
}
