module.exports = (sequelize, Sequelize) => {
    const PostLike = sequelize.define("postlikes", {
        userId: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        postId: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    });
    return PostLike;
};
