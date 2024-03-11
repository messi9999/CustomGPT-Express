const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
var jwt = require("jsonwebtoken");

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  User.findOne({
    where: {
      id: req.body.userId,
    },
  })
    .then((user) => {
      console.log(user)
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      const token = jwt.sign({ id: user.id }, config.secret, {
        algorithm: "HS256",
        allowInsecureKeySizes: true,
        expiresIn: 86400, // 24 hours
      });

      var authorities = [];
      user.getRoles().then((roles) => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }
        res.status(200).send({
          id: user.id,
          username: user.username,
          email: user.email,
          threadID: user.threadID,
          subscription: user.subscription,
          roles: authorities,
          accessToken: token,
          freeAttempts: user.freeAttempts
        });
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.adminBoard = (req, res) => {
  User.count().then((count) => {
    res.status(200).send({userCount: count});
  }).catch((error) => {res.status(500).send(error)})
};

exports.getAllUser = (req, res) => {
  User.findAll({}).then(users => {
    res.send(users)
  }).catch(error => {
    res.status(500).send({
      message: error.message || "Some error occurred while retrieving users."
    })
  })
}