const User = require("../models/AuthenticationModel");
const bcrypt = require("bcrypt");

const login = (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        res
          .status(404)
          .json({ result: "Fail", message: "You've not registered" });
      }

      bcrypt
        .compare(password, user.password)
        .then((match) => {
          if (!match) {
            res
              .status(401)
              .json({ result: "Fail", message: "Give proper credentials" });
          }

          res.status(200).json({
            result: "Success",
            message: "You've logged in successfully",
            name: user.name
          });
        })
        .catch((err) => {
          console.error("Error comparing passwords:", err);
          return res
            .status(500)
            .json({ result: "Error", message: "Server error" });
        });
    })
    .catch((err) => {
      console.error("Error finding user:", err);
      return res.status(500).json({ result: "Error", message: "Server error" });
    });
};

module.exports = login;
