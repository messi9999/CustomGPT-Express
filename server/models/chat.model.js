module.exports = (sequelize, Sequelize) => {
    const Chat = sequelize.define("chats", {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true
        },
        userId: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
        createId: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
        chatType: {
          type: Sequelize.STRING,
          allowNull: false
        },
        text: {
          type: Sequelize.TEXT,
          allowNull: false
        },
      });
  
    return Chat;
  };
  