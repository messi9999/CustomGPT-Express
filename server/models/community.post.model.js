module.exports = (sequelize, Sequelize) => {
    const Post = sequelize.define("posts", {
        // id: {
        //     type: Sequelize.INTEGER,
        //     primaryKey: true,
        //   },
        userId: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        title: {
            type: Sequelize.STRING,
            allowNull: true
        },
        content: {
            type: Sequelize.TEXT,
            allowNull: true
        },
        image: {
            type: Sequelize.STRING,
            allowNull: true
        },
        file: {
            type: Sequelize.STRING,
            allowNull: true
        }

    });

    return Post;
};
