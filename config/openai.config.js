require("dotenv").config();

module.exports = {
  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  OPENAI_ASSISTANT_ID: process.env.OPENAI_ASSISTANT_ID,
  OPENAI_THREAD_ID: process.env.OPENAI_THREAD_ID,
  OPENAI_API_ENDPOINT: process.env.OPENAI_API_ENDPOINT
};
