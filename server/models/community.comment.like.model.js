module.exports = (sequelize, Sequelize) => {
    const CommentLike = sequelize.define("commentlikes", {
        // id: {
        //     type: Sequelize.INTEGER,
        //     primaryKey: true,
        //   },
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
