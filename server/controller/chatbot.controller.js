const chatGptUtils = require("../utils/chatgpt.utils");
const openaiConfig = require("../config/openai.config");

exports.getResponseFromGpt = async (req, res) => {
  try {
    console.log("chating");
    const userMessage = req.body.message;
    const threadId = openaiConfig.OPENAI_THREAD_ID;

    // Wrap each async operation in try-catch
    let message;
    try {
      message = await chatGptUtils.addNewMessage(userMessage, threadId);
    } catch (error) {
      console.error("Error adding new message:", error);
      return res.status(500).send({ message: "OpenAI Error!!!" });
    }

    let assistant_run;
    try {
      assistant_run = await chatGptUtils.createRunAssistant(threadId);
    } catch (error) {
      console.error("Error creating run assistant:", error);
      return res.status(500).send({ message: "OpenAI Error!!!" });
    }

    let run_status = "";
    while (run_status !== "completed") {
      let run;
      try {
        run = await chatGptUtils.checkRunAssistant(assistant_run, threadId);
      } catch (error) {
        console.error("Error checking run assistant:", error);
        return res.status(500).send({ message: "OpenAI Error!!!" });
      }
      run_status = run.status;
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    let messages;
    try {
      messages = chatGptUtils.displayAssistant(threadId);
    } catch (error) {
      console.error("Error displaying assistant:", error);
      return res.status(500).send({ message: "OpenAI Error!!!" });
    }

    if (messages.data[0].role === "assistant") {
      res.send({
        message: messages.data[0].content[0].text.value,
      });
    } else {
      res.send({
        message: "You did not get from customGPT.",
      });
    }
  } catch (error) {
    console.error("An unexpected error occurred:", error);
    res.status(500).send({ message: "OpenAI Error!!!" });
  }
};

exports.createThread = async (req, res) => {
  const thread = await chatGptUtils.createNewThread();
  res.send({
    thread: thread,
  });
};
