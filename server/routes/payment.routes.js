const controller = require("../controller/payment.controller");
const { authJwt } = require("../middleware");

var router = require("express").Router();

module.exports = (app) => {
  router.post(
    "/create-subscription-checkout-session",
    [authJwt.verifyToken],
    controller.createSubscriptionCheckoutSession
  );
  router.post(
    "/payment-success",
    [authJwt.verifyToken],
    controller.paymentSuccess
  );

  app.use("/api/payment", router);
};
