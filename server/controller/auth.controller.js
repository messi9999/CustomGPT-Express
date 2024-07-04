const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

const chatGptUtils = require("../utils/chatgpt.utils");

const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);
const moment = require("moment")

exports.signup = (req, res) => {
  chatGptUtils
    .createNewThread()
    .then((thread) => {
      User.create({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
        threadID: thread.id,
        subscription: {
          subscription: null
        },
        freeAttempts: 10
      })
        .then((user) => {
          if (req.body.roles) {
            Role.findAll({
              where: {
                name: {
                  [Op.or]: req.body.roles,
                },
              },
            }).then((roles) => {
              user.setRoles(roles).then(() => {
                const token = jwt.sign({ id: user.id }, config.secret, config.options);
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
              });
            });
          } else {
            // user role = 1
            user.setRoles([1]).then(() => {
              const token = jwt.sign({ id: user.id }, config.secret, config.options);

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
            });
          }
        })
        .catch((err) => {
          res.status(500).send({ message: err.message });
        });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.signin = (req, res) => {
  User.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }

      if (user.subscriptionid) {
        stripe.subscriptions
          .retrieve(user.subscriptionid)
          .then((subscription) => {
            const planId = subscription.plan.id;
            const planType = "basic";

            const startDate = moment
              .unix(subscription.current_period_start)
              .format("YYYY-MM-DD");
            const endDate = moment
              .unix(subscription.current_period_end)
              .format("YYYY-MM-DD");
            const durationInSeconds =
              subscription.current_period_end -
              subscription.current_period_start;
            const durationInDays = moment
              .duration(durationInSeconds, "seconds")
              .asDays();

            const trialEndDate = moment.unix(subscription.trial_end).format("YYYY-MM-DD")

            User.update(
              {
                subscription: {
                  sessionId: null,
                  trialEndDate: trialEndDate,
                  planId: planId,
                  planType: planType,
                  planStartDate: startDate,
                  planEndDate: endDate,
                  planDuration: durationInDays,
                },
                subscriptionid: subscription.id
              },
              {
                where: { id: user.id },
              }
            )
              .catch((error) => {
                console.log(error)
              });
          })
          .catch((error) => {
            console.error("Error retrieving subscription", error);
          });
      }

      const token = jwt.sign({ id: user.id }, config.secret, config.options);

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
      console.log(err)
      res.status(500).send({ message: err.message });
    });
};
