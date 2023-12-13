const chatbots = require("../controller/chatbot.controller");

var router = require("express").Router();

module.exports = (app) => {
  router.post("/getResponseFromGpt", chatbots.getResponseFromGpt);
  router.get("/createThread", chatbots.createThread);

  app.use("/api/chatbots", router);
};
