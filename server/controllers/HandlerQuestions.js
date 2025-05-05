const { problemHandlers } = require('../utils/problemHandlers');

const handleQuestion = (title, language, testCase, code) => {
  console.log(`Handling question: ${title} in language: ${language}`);

  const handlers = problemHandlers[language];
  if (!handlers) {
    throw new Error(`No handlers defined for language: ${language}`);
  }

  const handler = handlers[title.toLowerCase()];
  if (!handler) {
    throw new Error(`Handler not found for problem title: ${title}`);
  }

  console.log(`Handler found for ${title}, now running the solution...`);
  
  return handler(testCase.input, code);
};

module.exports = { handleQuestion };