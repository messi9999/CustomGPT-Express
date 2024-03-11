const db = require("../models"); // adjust the path to your models directory
const Chat = db.chat;

exports.insertChat = (userId, createId, chatType, text) => {
  return Chat.create({
    userId,
    createId,
    chatType,
    text
  })
  .then(newChat => newChat)
  .catch(error => {
    console.error("Error inserting chat:", error);
    throw error;
  });
};