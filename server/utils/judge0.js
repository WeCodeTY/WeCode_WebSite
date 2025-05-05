const axios = require("axios");

const judge0Configs = [
  {
    apiUrl: process.env.JUDGE0_API_URL_1,
    apiKey: process.env.RAPIDAPI_KEY_1,
    apiHost: process.env.RAPIDAPI_HOST_1,
  },
  {
    apiUrl: process.env.JUDGE0_API_URL_2,
    apiKey: process.env.RAPIDAPI_KEY_2,
    apiHost: process.env.RAPIDAPI_HOST_2,
  },
  {
    apiUrl: process.env.JUDGE0_API_URL_3,
    apiKey: process.env.RAPIDAPI_KEY_3,
    apiHost: process.env.RAPIDAPI_HOST_3,
  },
  {
    apiUrl: process.env.JUDGE0_API_URL_4,
    apiKey: process.env.RAPIDAPI_KEY_4,
    apiHost: process.env.RAPIDAPI_HOST_4,
  },
  {
    apiUrl: process.env.JUDGE0_API_URL_5,
    apiKey: process.env.RAPIDAPI_KEY_5,
    apiHost: process.env.RAPIDAPI_HOST_5,
  },
];

const runCodeWithJudge0 = async ({ source_code, language_id, stdin = "" }) => {
  for (const config of judge0Configs) {
    try {
      const submissionRes = await axios.post(
        `${config.apiUrl}/submissions?base64_encoded=false&wait=true`,
        {
          source_code,
          language_id,
          stdin,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "X-RapidAPI-Key": config.apiKey,
            "X-RapidAPI-Host": config.apiHost,
          },
        }
      );
      return submissionRes.data;
    } catch (error) {
      console.warn(`⚠️ Judge0 API at ${config.apiUrl} failed. Trying next...`, error.response?.data || error.message);
    }
  }

  throw new Error("All Judge0 API keys failed.");
};

module.exports = runCodeWithJudge0;