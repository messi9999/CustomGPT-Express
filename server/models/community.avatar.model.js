const { STRING } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const Avatar = sequelize.define("avatars", {
        userId: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        uri: {
            type: Sequelize.STRING,
            allowNull: false
        },
        firstname: {
            type: Sequelize.STRING,
            allowNull: false
        },
        lastname: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });
    return Avatar;
};
