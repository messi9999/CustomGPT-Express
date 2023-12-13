const openaiConfig = require("../config/openai.config");
const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: openaiConfig.OPENAI_API_KEY
});

exports.createNewThread = async () => {
  try {
    const thread = await openai.beta.threads.create();
    return thread;
  } catch (error) {
    console.error("Error creating a new thread:", error);
    throw error;
  }
};

exports.addNewMessage = async (userMessage, threadId) => {
  try {
    const message = await openai.beta.threads.messages.create(threadId, {
      role: "user",
      content: userMessage
    });

    return message;
  } catch (error) {
    console.error("Error adding a new message:", error);
    throw error;
  }
};

exports.createRunAssistant = async (threadId) => {
  try {
    const run = await openai.beta.threads.runs.create(threadId, {
      assistant_id: openaiConfig.OPENAI_ASSISTANT_ID,
      instructions:
        "Please address the user as Jane Doe. The user has a premium account."
    });
    return run;
  } catch (error) {
    console.error("Error adding a new message:", error);
    throw error;
  }
};

exports.checkRunAssistant = async (run, threadId) => {
  try {
    const sRun = await openai.beta.threads.runs.retrieve(threadId, run.id);
    return sRun;
  } catch (error) {
    console.error("Error adding a new message:", error);
    throw error;
  }
};

exports.displayAssistant = async (threadId) => {
  try {
    const messages = await openai.beta.threads.messages.list(threadId);
    return messages;
  } catch (error) {
    console.error("Error adding a new message:", error);
    throw error;
  }
};
