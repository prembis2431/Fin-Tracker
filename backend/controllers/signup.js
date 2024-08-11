const User = require("../models/AuthenticationModel");
const bcrypt = require("bcrypt");

const signup = (req, res) => {
  const { name, email, password } = req.body;
  console.log(name, email, password)
  User.findOne({ email: email }).then((obj) => {
    console.log(obj)
    if (!obj) {
      bcrypt
        .hash(password, 10)
        .then((hashedpw) => {
          const userObject = {
            name: name,
            email: email,
            password: hashedpw,
            createdAt: Date.now(),
          };
          const newUser = new User(userObject);
          newUser.save();

          res.status(200).json({newUser}); // Side-note: if we are sending string response, json should not be used.
          console.log(newUser);
        })
        .catch((err) => {
          console.log(err);
        });
    } else{

        res.status(400).json({message: "User already exists!"})
    }
  });
};

module.exports = signup;
