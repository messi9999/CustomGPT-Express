const { authJwt } = require("../middleware");
const controller = require("../controller/user.controller");
var router = require("express").Router();
module.exports = function (app) {
  router.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  router.get("/all", controller.allAccess);

  router.post("/user", [authJwt.verifyToken], controller.userBoard);

  router.post(
    "/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );

  router.post(
    "/getAllUsers",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.getAllUser
  )

  router.post(
    "/useravatar",
    [authJwt.verifyToken],
    controller.createUserAvatar
  )
  router.put(
    "/useravatar",
    [authJwt.verifyToken],
    controller.updateUserAvatar
  )

  app.use("/api/test", router);
};
