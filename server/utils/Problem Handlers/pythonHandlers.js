const pythonHandlers = {
  "two sum": (inputStr, code) => {
    const match = inputStr.match(/nums\s*=\s*(\[[^\]]+\])\s*,\s*target\s*=\s*(\d+)/);
    if (!match) throw new Error("Invalid input format");

    const nums = JSON.parse(match[1]);
    const target = match[2];

    return `
${code}
result = twoSum(${nums}, ${target})
print(result)
    `;
  },

  "longest substring without repeating characters": (inputStr, code) => {
    return `
${code}
print(lengthOfLongestSubstring("${inputStr}"))
    `;
  },

  // Add more problems here
};

module.exports = pythonHandlers;
