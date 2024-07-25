const db = require("../models");
const decodeToken = require("../utils/decodeToken")

const fs = require('fs');

const Post = db.post;
const Comment = db.comment;
const PostLike = db.postLike
const CommentLike = db.commentLike

const getCurrentTimeISO = () => {
    const now = new Date();
    return now.toISOString();
}

exports.getAllPosts = (req, res) => {
    const limit = req.query.limit
    const offset = req.query.offset
    Post.findAll({
        include: [
            {
                model: db.postLike,
                as: 'postLikes',
                attributes: ['id', 'postId', 'userId']
            },
            {
                model: db.comment,
                as: 'comments',
                attributes: ['id', 'postId', 'text', 'userId'],
                include: [
                    {
                        model: db.commentLike,
                        as: 'commentLikes',
                        attributes: ['id', 'commentId', 'userId']
                    }
                ]
            },
            {
                model: db.user,
                as: 'user',
                attributes: ['id', 'username', 'email', 'firstname', 'lastname', 'avatar_uri'],
            }
        ],
        limit: limit,
        offset: offset,
        order: [['id', 'DESC']]
    }).then((posts) => {
        return res.status(200).send({ posts: posts, servertime: getCurrentTimeISO() })
    }).catch((err) => {
        return res.status(500).send({ message: err.message });
    })
}

exports.getPostsByUser = (req, res) => {
    let token = req.headers["x-access-token"];
    const userId = decodeToken.getUserIdFromToken(token)

    Post.findAll({
        where: { userId: userId }, include: [
            {
                model: db.postLike,
                as: 'postLikes',
                attributes: ['id', 'postId', 'userId']
            },
            {
                model: db.comment,
                as: 'comments',
                attributes: ['id', 'postId', 'text', 'userId']
            }
        ],
        limit: 2
    }).then((posts) => {
        return res.status(200).send({ posts: posts })
    }).catch((err) => {
        return res.status(500).send({ message: err.message });
    })
}

exports.createPost = (req, res) => {
    let token = req.headers["x-access-token"];
    const userId = decodeToken.getUserIdFromToken(token)
    let filePath = ""
    let imagePath = ""
    let uploadedFile = null
    let uploadedImage = null

    if (req.files) {
        if (req.files.file) {
            const fileUniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
            const fileName = fileUniqueSuffix + '-' + req.files.file.name.replace(/\s+/g, '')
            uploadedFile = req.files.file;
            filePath = "server/storage/community/files/" + fileName
            uploadedFile.mv(filePath)
        }
        if (req.files.image) {
            const imageUniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
            const imageName = imageUniqueSuffix + '-' + req.files.image.name.replace(/\s+/g, '')
            uploadedImage = req.files.image;
            imagePath = "server/storage/community/images/" + imageName
            uploadedImage.mv(imagePath)
        }
    }

    Post.create({
        userId: userId,
        title: req.body.title,
        content: req.body.content,
        image: uploadedImage ? imagePath : null,
        file: uploadedFile ? filePath : null,
    }).then((post) => {
        return res.status(200).send({ post: post })
    }).catch((err) => {
        console.log(err)
        return res.status(500).send({ message: err.message });
    })
}

exports.updatePost = (req, res) => {
    Post.update({
        content: req.body.content,
    }, {
        where: {
            id: req.body.postId
        },
    }).then((post) => {
        return res.status(200).send({ post: post })
    }).catch((err) => {
        console.log(err)
        return res.status(500).send({ message: err.message });
    })
}

exports.deletePost = (req, res) => {
    let imagePath = ''
    let filePath = ''
    Post.findOne({
        where: {
            id: req.params.postId
        }
    }).then((post) => {
        imagePath = post.image
        filePath = post.file
        Post.destroy({
            where: {
                id: req.params.postId,
            }
        })age });
            })
        }).catch((err) => {
            console.log(err)
            return res.status(500).send({ message: err.message });
        })
    }).catch((err) => {
        console.log(err.message)
    })

}

exports.createPostLike = (req, res) => {
    let token = req.headers["x-access-token"];
    const userId = decodeToken.getUserIdFromToken(token)

    PostLike.create(({
        userId: userId,
        postId: req.body.postId,
    })).then((postLike) => {
        return res.status(200).send({ postLike: postLike })
    }).catch((err) => {
        return res.status(500).send({ message: err.message });
    })
}

exports.deletePostLike = (req, res) => {
    let token = req.headers["x-access-token"];
    const userId = decodeToken.getUserIdFromToken(token)

    PostLike.destroy({
        where: {
            userId: userId,
            postId: req.params.postId,
        }
    }).then((deletedRecordsCount) => {
        return res.status(200).send({ deletedRecordsCount: deletedRecordsCount })
    }).catch((err) => {
        return res.status(500).send({ message: err.message });
    })
}


exports.getCommentsByPost = (req, res) => {
    const postId = req.params.postId

    Comment.findAll({
        where: {
            postId: postId,
        },
        include: [{
            model: db.user,
            as: 'user',
            attributes: ['id', 'username', 'firstname', 'lastname', 'avatar_uri'],
            
        },
        {
            model: db.commentLike,
            as: 'commentLikes',
            attributes: ['id', 'commentId', 'userId']
        }
        ],
        order: [['id', 'ASC']]
    }).then((comments) => {
        return res.status(200).send({ comments: comments })
    }).catch((err) => {
        console.log(err)
        return res.status(500).send({ message: err.message });
    })
}


exports.createComment = (req, res) => {
    let token = req.headers["x-access-token"];
    const userId = decodeToken.getUserIdFromToken(token)
    const postId = req.body.postId

    Comment.create({
        postId: postId,
        userId: userId,
        text: req.body.text
    }).then((comment) => {
        return res.status(200).send({ comment: comment })
    }).catch((err) => {
        return res.status(500).send({ message: err.message });
    })
}

exports.updateComment = (req, res) => {
    Comment.update({
        text: req.body.text
    }, {
        where: {
            id: req.body.commentId
        }
    }).then((comment) => {
        return res.status(200).send({ comment: comment })
    }).catch((err) => {
        return res.status(500).send({ message: err.message });
    })
}

exports.deleteComment = (req, res) => {
    Comment.destroy({
        where: {
            id: req.params.commentId
        }
    }).then((comment) => {
        CommentLike.destroy({
            where: {
                commentId: req.params.commentId
            }
        }).then((commentlikes) => {
            return res.status(200).send({ result: true })
        }).catch((err) => {
            return res.status(500).send({ message: err.message });
        })
    }).catch((err) => {
        return res.status(500).send({ message: err.message });
    })
}


exports.createCommentLike = (req, res) => {
    let token = req.headers["x-access-token"];
    const userId = decodeToken.getUserIdFromToken(token)

    CommentLike.create(({
        userId: userId,
        commentId: req.body.commentId,
    })).then((commentLike) => {
        return res.status(200).send({ commentLike: commentLike })
    }).catch((err) => {
        return res.status(500).send({ message: err.message });
    })
}

exports.deleteCommentLike = (req, res) => {
    let token = req.headers["x-access-token"];
    const userId = decodeToken.getUserIdFromToken(token)

    CommentLike.destroy({
        where: {
            userId: userId,
            commentId: req.params.commentId,
        }
    }).then((deletedRecordsCount) => {
        return res.status(200).send({ deletedRecordsCount: deletedRecordsCount })
    }).catch((err) => {
        return res.status(500).send({ message: err.message });
    })
}

exports.donwload = (req, res) => {
    const filePath = req.query.path;

    res.download(filePath, (err) => {
        if (err) {
            console.error('Error downloading file:', err);
            res.status(500).send('Error downloading file.');
        }
    })
}


