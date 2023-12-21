const { verifySignUp } = require("../middleware");
const controller = require("../controller/auth.controller");

var router = require("express").Router();

module.exports = function (app) {
  router.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  router.post(
    "/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted,
    ],
    controller.signup
  );

  router.post("/signin", controller.signin);

  app.use("/api/auth", router);
};
