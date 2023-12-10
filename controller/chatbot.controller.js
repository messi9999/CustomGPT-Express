const chatGptUtils = require("../utils/chatgpt.utils");
const openaiConfig = require("../config/openai.config");

exports.getResponseFromGpt = async (req, res) => {
  const userMessage = req.body.message;
  const threadId = openaiConfig.OPENAI_THREAD_ID;
  const message = await chatGptUtils.addNewMessage(userMessage, threadId);
  res.send({
    message: message
  });
};

exports.createThread = async (req, res) => {
  const thread = await chatGptUtils.createNewThread();
  res.send({
    thread: thread
  });
};
