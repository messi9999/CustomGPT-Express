const openaiConfig = require("../config/openai.config");
const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: openaiConfig.OPENAI_API_KEY,
});

exports.createNewThread = () => {
  return openai.beta.threads
    .create()
    .then((thread) => thread)
    .catch((error) => {
      console.error("Error creating a new thread:", error);
      throw error;
    });
};

exports.addNewMessage = (userMessage, threadId) => {
  return openai.beta.threads.messages
    .create(threadId, {
      role: "user",
      content: userMessage,
    })
    .then((message) => message)
    .catch((error) => {
      console.error("Error adding a new message:", error);
      throw error;
    });
};

exports.createRunAssistant = (threadId, assistantID) => {
  return openai.beta.threads.runs
    .create(threadId, {
      assistant_id: assistantID,
      instructions: "",
    })
    .then((run) => run)
    .catch((error) => {
      console.error("Error creating run assistant:", error);
      throw error;
    });
};

exports.checkRunAssistant = (run, threadId) => {
  return openai.beta.threads.runs
    .retrieve(threadId, run.id)
    .then((sRun) => sRun)
    .catch((error) => {
      console.error("Error checking run assistant:", error);
      throw error;
    });
};

exports.displayAssistant = (threadId) => {
  return openai.beta.threads.messages
    .list(threadId)
    .then((messages) => messages)
    .catch((error) => {
      console.error("Error displaying assistant:", error);
      throw error;
    });
};
