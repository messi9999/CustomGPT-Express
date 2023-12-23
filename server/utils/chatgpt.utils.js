const openaiConfig = require("../config/openai.config");
// const OpenAI = require("openai");
const axios = require("axios")
const { SocksProxyAgent } = require('socks-proxy-agent');

// const agent = new SocksProxyAgent('socks5://14aae74da516b:91a1671310@161.77.153.72:12324');

// const axios = axios_raw.create({
//   httpsAgent: agent
// });

const file_ids = [
  "file-VlmhM4CyMeaS8kM2Eqn3UzgO",
  "file-ZCHmPRohQAPaPg4TVKxqCrbi",
  "file-QTHEpKT9ymkQN9jaoehrW0Ph",
  "file-8RmoleYDKjW7CWTPNQKXXMfz",
  "file-3FZPtu4OtsKssxmMV8Y5wADK",
  "file-CrpMaBkVAnpImrEV09xI9LwS",
  "file-idl38tIBfSrPc62NMrGvCCym",
  "file-ZpRR6P3ziip6RE1Dj5mUtNE5",
  "file-lF0mCFyBJMAZPG2iYfh4ULpu",
  "file-oG458rr3nHduEqQo0ku8iSp3",
  "file-Di1tob8ITq5s0IE7wRejU61d"
]

const assistant_ids = [
  "asst_j3JLCZxlIFrU2QgaYUHJQYyc",
  "asst_1kcoR7EywMR0Ci8tAm7UqzNh",
  "asst_m7FDil5Gei1IUGIiydpWGNpm",
  "asst_mGQfecbb9v5eUNwheAE38uld",
  "asst_VwKeai4n7dtrg1ctwXBwLMmP",
  "asst_HHKfVxspt9ZLEKwJubMnBNXE",
  "asst_H6wwqLkXlKww2pkJpY1mnVXs",
  "asst_NjyZmDLim6LsaS0XKF23KtoK",
  "asst_6JnvHrWBB3Cw4zU9DZlh71GL",
  "asst_bCA5S2ZHuukiABKTF6ZLtkJe",
  "asst_jNqlLlOptwouobwm2FuuPySP",
  "asst_7L2p51JEyR5PQcODrePz0Tfh",
  "asst_zpuMIpwCDvrrp2jbMY6ijRvr",
  "asst_SrVRYOpsDyPTvkfbG8BowaMQ",
  "asst_YQF53IFVaIThDkkBkQvXB8Rz",
]

exports.updatedAssistant = () => {
  console.log("Updating Assistants...")
  let promises = assistant_ids.map(assistant_id => axios.post(`https://api.openai.com/v1/assistants/${assistant_id}`,
  {
    instructions: "",
    tools: [{"type": "retrieval"}],
    model: "gpt-4-1106-preview",
    file_ids: file_ids
  }, 
  {
    headers: {
      'Authorization': `Bearer ${openaiConfig.OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
      'OpenAI-Beta': 'assistants=v1'
    }
  }).then((res) => {return res}))

  Promise.all(promises).then(results => {
    results.forEach(response => console.log(response.data));
  }).catch(error => console.error(error));
}


exports.createNewThread = () => {
  return axios.post('https://api.openai.com/v1/threads', {}, {
    headers: {
      'Authorization': `Bearer ${openaiConfig.OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
      'OpenAI-Beta': 'assistants=v1'
    }
  })
  .then(response => response.data)
  .catch(error => {
    console.error("Error creating a new thread:", error);
    throw error;
  });
};

exports.addNewMessage = (userMessage, threadId) => {
  return axios.post(`https://api.openai.com/v1/threads/${threadId}/messages`, {
    role: "user",
    content: userMessage,
  }, {
    headers: {
      'Authorization': `Bearer ${openaiConfig.OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
      'OpenAI-Beta': 'assistants=v1'
    }
  })
  .then(response => response.data)
  .catch(error => {
    console.error("Error adding a new message:", error);
    throw error;
  });
};

exports.createRunAssistant = (threadId, assistantID) => {
  return axios.post(`https://api.openai.com/v1/threads/${threadId}/runs`, {
    assistant_id: assistantID,
    instructions: "",
  }, {
    headers: {
      'Authorization': `Bearer ${openaiConfig.OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
      'OpenAI-Beta': 'assistants=v1'
    }
  })
  .then(response => response.data)
  .catch(error => {
    console.error("Error creating run assistant:", error);
    throw error;
  });
};

exports.checkRunAssistant = (run, threadId) => {
  return axios.get(`https://api.openai.com/v1/threads/${threadId}/runs/${run.id}`, {
    headers: {
      'Authorization': `Bearer ${openaiConfig.OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
      'OpenAI-Beta': 'assistants=v1'
    }
  })
  .then(response => response.data)
  .catch(error => {
    console.error("Error checking run assistant:", error);
    throw error;
  });
};


exports.displayAssistant = (threadId) => {
  return axios.get(`https://api.openai.com/v1/threads/${threadId}/messages`, {
    headers: {
      'Authorization': `Bearer ${openaiConfig.OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
      'OpenAI-Beta': 'assistants=v1'
    }
  })
  .then(response => response.data)
  .catch(error => {
    console.error("Error displaying assistant:", error);
    throw error;
  });
};