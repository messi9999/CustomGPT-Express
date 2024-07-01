module.exports = (sequelize, Sequelize) => {
    const CommentLike = sequelize.define("commentlikes", {
        userId: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        commentId: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    });
    return CommentLike;
};
