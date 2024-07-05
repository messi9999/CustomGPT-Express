const chatGptUtils = require("../utils/chatgpt.utils");
const chatHistory = require("../utils/chat.history");
const db = require("../models");
const User = db.user;
const Chat = db.chat;

const OpenAI = require("openai");
const openai = new OpenAI(process.env.OPENAI_API_KEY);

exports.getResponseFromGpt = (req, res) => {
  const userMessage = req.body.message;
  const threadId = req.body.threadID;
  const assistantID = req.body.assistantID;
  let freeAttempts = req.body.freeAttempts;
  const userId = req.body.userId;
  const createId = req.body.createId;

  let fullMessage = "";
  


  chatGptUtils
    .addNewMessage(userMessage, threadId)
    .then((message) => {
      chatHistory
        .insertChat(userId, createId, "user", userMessage)
        .catch((error) => {
          console.error("An error occurred:", error);
          res.status(500).send({
            message: "Error updating chat table.",
          });
        });
    })
    .then(() => {

      res.setHeader("Content-Type", "text/event-stream");
      res.setHeader("Cache-Control", "no-cache");
      res.setHeader("Connection", "keep-alive");

      new Promise((resolve, reject) => {
        const run = openai.beta.threads.runs
          .createAndStream(threadId, { assistant_id: assistantID })
          .on("textDelta", (textDelta, snapshot) => {
            fullMessage += textDelta.value;
            res.write(textDelta.value);
          })
          .on("error", (error) => {
            res.status(500).send({ message: error.message });
            reject(error);
          })
          .on("end", () => {
            resolve(run);
          });
      }).then((run) => {
        chatHistory
          .insertChat(userId, createId, "assistant", fullMessage)
          .then(() => {
            if(!req.body.iskajabiuser) {

              if (freeAttempts > 0) {
                User.update(
                  {
                    freeAttempts: freeAttempts - 1,
                  },
                  {
                    where: { id: userId },
                  }
                );
              }
            }
          })
          .catch((error) => {
            console.error("An error occurred:", error);
          });
      });
    })
    .catch((error) => {
      console.error("An error occurred:", error);
      res.status(500).send({ message: "OpenAI Error!!!" });
    });
};

exports.createThread = (req, res) => {
  chatGptUtils
    .createNewThread()
    .then((thread) => {
      res.send({
        thread: thread,
      });
    })
    .catch((error) => {
      // Handle errors here
      res
        .status(500)
        .send({ error: "An error occurred while creating the thread." });
    });
};

exports.getChatHistory = (req, res) => {
  const userId = req.body.userId;
  const createId = req.body.createId;
  Chat.findAll({
    where: {
      userId,
      createId,
    },
  })
    .then((chats) => {
      res.send(chats);
    })
    .catch((error) => {
      res.status(500).send({
        message: error.message || "Some error occurred while retrieving users.",
      });
    });
};
