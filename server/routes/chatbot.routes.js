const controller = require("../controller/chatbot.controller");
const { authJwt,  paymentCheck} = require("../middleware");

var router = require("express").Router();

  app.use("/api/chatbots", router);
};
