const chatGptUtils = require("../utils/chatgpt.utils");
const openaiConfig = require("../config/openai.config");

exports.getResponseFromGpt = async (req, res) => {
  const userMessage = req.body.message;
  const threadId = openaiConfig.OPENAI_THREAD_ID;
  const message = await chatGptUtils.addNewMessage(userMessage, threadId);
  const assistant_run = await chatGptUtils.createRunAssistant(threadId);
  const run_status = "";
  while (run_status !== "completed") {
    run = await chatGptUtils.checkRunAssistant(assistant_run, threadId);
    run_status - run.status;
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
  const messages = chatGptUtils.displayAssistant(threadId);
  if (messages.data[0].role === "assistant") {
    res.send({
      message: response.data[0].content[0].text.value
    });
  } else {
    res.send({
      message: "You did not get from customGPT."
    });
  }
};

exports.createThread = async (req, res) => {
  const thread = await chatGptUtils.createNewThread();
  res.send({
    thread: thread
  });
};
