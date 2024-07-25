const { authJwt } = require("../middleware");
const controller = require("../controller/community.controller");
var router = require("express").Router();

module.exports = function (app) {
    router.use(function (req, res, next) {
        res.header(
            "Access-Control_Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept",
        );
        next();
    });

    router.get("/post/all", [authJwt.verifyToken], controller.getAllPosts);
    router.get("/post/byUser", [authJwt.verifyToken], controller.getPostsByUser);
    router.post("/post/create", [authJwt.verifyToken], controller.createPost);
    router.put("/post/create", [authJwt.verifyToken], controller.updatePost);
    router.delete("/post/create/:postId", [authJwt.verifyToken], controller.deletePost);

    router.post("/post/like/create", [authJwt.verifyToken], controller.createPostLike);
    router.delete("/post/like/create/:postId", [authJwt.verifyToken], controller.deletePostLike);

    router.get("/comment/byPost/:postId", [authJwt.verifyToken], controller.getCommentsByPost);
    router.post("/comment/create", [authJwt.verifyToken], controller.createComment);
    router.put("/comment/create", [authJwt.verifyToken], controller.updateComment);
    router.delete("/comment/create/:commentId", [authJwt.verifyToken], controller.deleteComment);

    router.post("/comment/like/create", [authJwt.verifyToken], controller.createCommentLike);



    router.get("/download", controller.donwload);

    app.use("/api/community", router);
}