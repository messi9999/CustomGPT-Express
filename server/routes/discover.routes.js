const controller = require("../controller/discover.controller");

const { uploadImage, authJwt } = require("../middleware");

var router = require("express").Router();

module.exports = (app) => {
  router.post(
    "/upload",
    [uploadImage.store, authJwt.isAdmin],
    controller.uploadDiscoverImage
  );

  app.use("/api/discover", router);
};
