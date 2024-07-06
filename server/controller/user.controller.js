const db = require("../models");
const User = db.user;
const decodeToken = require("../utils/decodeToken")
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


exports.updateUserAvatar = (req, res) => {
  let token = req.headers["x-access-token"];
  const userId = decodeToken.getUserIdFromToken(token)
  let filePath = ""
  let avatarFile = null
  if (req.files) {
    if (req.files.avatar) {
      const fileUniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      const fileName = fileUniqueSuffix + '-' + req.files.avatar.name.replace(/\s+/g, '')
      avatarFile = req.files.avatar;
      filePath = "server/storage/user/avatar/" + fileName
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
    if (avatarFile && fs.existsSync(user.avatar_uri)) {
      fs.unlinkSync(user.avatar_uri);
    }
    let avatar_uri = null
    if (avatarFile) {
      avatar_uri = filePath
    }
    else {
      if (req.body.uri) {
        avatar_uri = req.body.uri
      }
    }

    User.update({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      avatar_uri: avatar_uri,
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
              res.status(200).send({
                user
              });
            }
          }).catch(error => {
            console.log(error)
            res.status(500).send({
              message: error.message || "Some error occurred while retrieving users."
            })
          })
        }
      }).catch(error => {
        console.log(error)
        res.status(500).send({
          message: error.message || "Some error occurred while retrieving users."
        })
      })
  });
}

exports.removeKajabiuser = (req, res) => {
  User.destroy({
    where: {
      iskajabiuser: true,
    },
  }).then(() => {
    res.status(200).send({ "message": "Removed!!!" })
  }).catch(error => {
    res.status(500).send({
      message: error.message || "Some error occurred while retrieving users."
    })
  })
}