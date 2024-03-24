const chatGptUtils = require("../utils/chatgpt.utils");
const chatHistory = require("../utils/chat.history");
const db = require("../models");
const User = db.user;
const Chat = db.chat;

let starttime = Date.now();
let endtime = Date.now();

exports.getResponseFromGpt = (req, res) => {
  const userMessage = req.body.message;
  const threadId = req.body.threadID;
  const assistantID = req.body.assistantID;
  let freeAttempts = req.body.freeAttempts;
  const userId = req.body.userId;
  const createId = req.body.createId;

  starttime = Date.now();
  chatGptUtils
    .addNewMessage(userMessage, threadId)
    .then((message) => {
      console.log("add message.........");
      endtime = Date.now();
      console.log(endtime - starttime);
      starttime = Date.now();

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
      return chatGptUtils.createRunAssistant(threadId, assistantID);
    })
    .then((assistant_run) => {
      console.log("create run assistant");
      endtime = Date.now();
      console.log(endtime - starttime);
      starttime = Date.now();

      const checkRunStatus = () => {
        return chatGptUtils
          .checkRunAssistant(assistant_run, threadId)
          .then((run) => {
            console.log("check run assistant");
            endtime = Date.now();
            console.log(endtime - starttime);
            starttime = Date.now();

            if (run.status !== "completed") {
              return new Promise((resolve) => setTimeout(resolve, 1000)).then(
                () => checkRunStatus()
              );
            }
            return run;
          });
      };
      return checkRunStatus();
    })
    .then(() => {
      return chatGptUtils.displayAssistant(threadId);
    })
    .then((messages) => {
      console.log("display assistant")
      endtime = Date.now();
      console.log(endtime - starttime);
      starttime = Date.now();

      if (messages.data[0].role === "assistant") {
        context = messages.data[0].content[0].text.value;
        chatHistory
          .insertChat(userId, createId, "assistant", context)
          .then(() => {
            if (freeAttempts > 0) {
              User.update(
                {
                  freeAttempts: freeAttempts - 1,
                },
                {
                  where: { id: userId },
                }
              )
                .then((num) => {
                  if (num == 1) {
                    res.send({
                      message: context,
                    });
                  }
                })
                .catch((error) => {
                  res.status(500).send({
                    message: "Error updating freeAttempts with id=" + userId,
                  });
                });
            } else {
              res.send({
                message: messages.data[0].content[0].text.value,
              });
            }
          })
          .catch((error) => {
            console.error("An error occurred:", error);
            res.status(500).send({
              message: "Error updating chat table.",
            });
          });
      } else {
        res.send({
          message: "You did not get from customGPT.",
        });
      }
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
