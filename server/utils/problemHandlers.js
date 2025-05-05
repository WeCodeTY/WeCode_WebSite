const jsHandlers = require('./Problem Handlers/jsHandlers');
const pythonHandlers = require('./Problem Handlers/pythonHandlers');
const cppHandlers = require('./Problem Handlers/cppHandler');

const problemHandlers = {
  javascript: jsHandlers,
  python: pythonHandlers,
  cpp: cppHandlers,
};

module.exports = { problemHandlers };