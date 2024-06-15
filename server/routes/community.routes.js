const { authJwt } = require("../middleware");
const controller = require("../controller/community.controller");
var router = require("express").Router();

module.exports = function (app) {
    router.use(function (req, res, next) {
        res.header(
            "Access-Control_Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    router.get("/post/all", [authJwt.verifyToken], controller.getAllPosts);
    router.get("/post/byUser", [authJwt.verifyToken], controller.getPostsByUser);
    router.post("/post/create", [authJwt.verifyToken], controller.createPost);
    router.post("/post/like/create", [authJwt.verifyToken], controller.createPostLike);
    router.put("/post/like/create", [authJwt.verifyToken], controller.updatePost);
    router.delete("/post/like/create/:postId", [authJwt.verifyToken], controller.deletePostLike);

    router.post("/comment/byPost", [authJwt.verifyToken], controller.getCommentsByPost);
    router.post("/comment/create", [authJwt.verifyToken], controller.createComment);



    router.get("/download", controller.donwload);

    app.use("/api/community", router);
}