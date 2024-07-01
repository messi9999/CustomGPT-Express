const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
// const Avatar = db.avatar
var jwt = require("jsonwebtoken");
const decodeToken = require("../utils/decodeToken")
const path = require('path');
const fs = require('fs');

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  let token = req.headers["x-access-token"];
  const userId = decodeToken.getUserIdFromToken(token)
  User.findOne({
    where: {
      id: userId,
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var authorities = [];
      user.getRoles().then((roles) => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }
        user.roles = authorities
        user.accessToken = token
        res.status(200).send({
          ...user.get({ plain: true }),
          roles: authorities,
          accessToken: token
        });
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.adminBoard = (req, res) => {
  User.count().then((count) => {
    res.status(200).send({ userCount: count });
  }).catch((error) => { res.status(500).send(error) })
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

// exports.createUserAvatar = (req, res) => {
//   let token = req.headers["x-access-token"];
//   const userId = decodeToken.getUserIdFromToken(token)
//   let filePath = ""
//   let avatarFile = null

//   if (req.files) {
//     if (req.files.avatar) {
//       const fileUniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//       const fileName = fileUniqueSuffix + '-' + req.files.avatar.name.replace(/\s+/g, '')
//       avatarFile = req.files.avatar;
//       filePath = "server/storage/user/avatar/" + fileName
//       avatarFile.mv(filePath)
//     }
//   }

//   Avatar.create({
//     firstname: req.body.firstname,
//     lastname: req.body.lastname,
//     uri: avatarFile ? filePath : null,
//     userId: userId
//   },
//   ).then((avatar) => {
//     console.log("user: ", avatar)
//     res.status(200).send({
//       firstname: req.body.firstname,
//       lastname: req.body.lastname,
//       uri: avatarFile ? filePath : null,
//       userId: userId
//     })
//   }).catch(error => {
//     console.log(error)
//     res.status(500).send({
//       message: error.message || "Some error occurred while retrieving users."
//     })
//   })
// }

exports.updateUserAvatar = (req, res) => {
  let token = req.headers["x-access-token"];
  const userId = decodeToken.getUserIdFromToken(token)
  let filePath = ""
  let avatarFile = null
  if (req.files) {
    if (req.files.avatar) {
      console.log("file save", req.files.avatar);
      const fileUniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      const fileName = fileUniqueSuffix + '-' + req.files.avatar.name.replace(/\s+/g, '')
      avatarFile = req.files.avatar;
      filePath = "server/storage/user/avatar/" + fileName
      // filePath = path.resolve(__dirname, '../storage/user/avatar', fileName)
      console.log(filePath)
      avatarFile.mv(filePath, function (err) {
        console.log(err)
      })
    }
  }

  User.findOne({
    where: {
      id: userId
    }
  }).then((user) => {
    if (fs.existsSync(user.avatar_uri)) {
      fs.unlinkSync(user.avatar_uri);
    }
    User.update({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      avatar_uri: avatarFile ? filePath : req.body.uri,
    },
      {
        where: {
          id: userId
        }
      },).then((num) => {
        if (num > 0) {
          User.findOne({
            where: {
              id: userId
            }
          }).then((user) => {
            if (user) {
              user.avatar_uri = avatarFile ? filePath : null
              // res.status(200).send(user)
              res.status(200).send({
                ...user.get({ plain: true }),
                avatar_uri: avatarFile ? filePath : null,
              });
            }
          }).catch(error => {
            console.log(error)
            res.status(500).send({
              message: error.message || "Some error occurred while retrieving users."
            })
          })
        }
        // user.avatar_uri = avatarFile ? filePath : null
        // console.log(user)
        // console.log(user.avatar_uri)
        // res.status(200).send(user)
      }).catch(error => {
        console.log(error)
        res.status(500).send({
          message: error.message || "Some error occurred while retrieving users."
        })
      })
  });
}