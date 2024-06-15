module.exports = (sequelize, Sequelize) => {
    const Comment = sequelize.define("comments", {
        // id: {
        //     type: Sequelize.INTEGER,
        //     primaryKey: true,
        //   },
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
