const chatGptUtils = require("../utils/chatgpt.utils");

exports.getResponseFromGpt = (req, res) => {
  const userMessage = req.body.message;
  const threadId = req.body.thread_id;
  const assistantID = req.body.assistantID;

  chatGptUtils
    .addNewMessage(userMessage, threadId)
    .then((message) => {
      return chatGptUtils.createRunAssistant(threadId, assistantID);
    })
    .then((assistant_run) => {
      const checkRunStatus = () => {
        return chatGptUtils
          .checkRunAssistant(assistant_run, threadId)
          .then((run) => {
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
      if (messages.data[0].role === "assistant") {
        res.send({
          message: messages.data[0].content[0].text.value,
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
