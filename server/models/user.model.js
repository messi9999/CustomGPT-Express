module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    username: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    threadID: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    firstname: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    lastname: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    subscriptionid: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    avatar_uri: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    subscription: {
      type: Sequelize.JSONB,
      allowNull: true,
    },
    freeAttempts: {
      type: Sequelize.SMALLINT,
      allowNull: false,
    },
    iskajabiuser: {
      type: Sequelize.BOOLEAN,
      allowNull: true,
    }
  });

  return User;
};
