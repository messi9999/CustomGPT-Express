module.exports = (sequelize, Sequelize) => {
    const Comment = sequelize.define("comments", {
        postId: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        userId: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        text: {
            type: Sequelize.TEXT,
            allowNull: true
        }
    });

    return Comment;
};
