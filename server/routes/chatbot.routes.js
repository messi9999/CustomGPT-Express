const controller = require("../controller/chatbot.controller");
const { authJwt,  paymentCheck} = require("../middleware");

var router = require("express").Router();

module.exports = (app) => {
  router.post(
    "/getResponseFromGpt",
    [authJwt.verifyToken, paymentCheck.checkPaymentExpiration],
    controller.getResponseFromGpt
  );
  router.get("/createThread", controller.createThread);

  app.use("/api/chatbots", router);
};
