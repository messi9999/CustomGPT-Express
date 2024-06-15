module.exports = (sequelize, Sequelize) => {
    const PostLike = sequelize.define("postlikes", {
        // id: {
        //     type: Sequelize.INTEGER,
        //     primaryKey: true,
        //   },
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
