module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    username: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
    password: {
      type: Sequelize.STRING,
    },
    threadID: {
      type: Sequelize.STRING,
    },
    subscription: {
      type: Sequelize.JSONB,
    },
  });

  return User;
};
