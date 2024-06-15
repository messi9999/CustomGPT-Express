const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
var jwt = require("jsonwebtoken");
const decodeToken = require("../utils/decodeToken")
const path = require('path');
const fs = require('fs');

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

      let token = req.headers["x-access-token"];

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

exports.updateUser = (req, res) => {
  let token = req.headers["x-access-token"];
  const userId = decodeToken.getUserIdFromToken(token)
  let filePath = ""
  let avatardFile = null

  if (req.files) {
    if (req.files.avatar) {
        const fileUniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        const fileName = fileUniqueSuffix + '-' + req.files.avatar.name.replace(/\s+/g, '')
        avatardFile = req.files.file;
        filePath = "server/storage/user/avatar/" + fileName
        avatardFile.mv(filePath)
    }
}

  User.update({
    where: {
      id: userId
    },
  }, {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    uri: avatardFile ? filePath : null
  }).then((user) => {
    console.log(user)
    res.status(200).send(user)
  }).catch(error => {
    res.status(500).send({
      message: error.message || "Some error occurred while retrieving users."
    })
  })
}