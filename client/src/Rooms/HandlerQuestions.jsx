import React from 'react';

const HandlerQuestions = () => {
  // Your component logic here
};

const genericHandler = (functionName, argCount) => (inputStr, code) => {
  const args = inputStr.split(",").map(v => v.split("=")[1]?.trim());
  if (args.length !== argCount || args.includes(undefined)) {
    throw new Error("Invalid or malformed input: " + inputStr);
  }
  return `
    ${code}
    const result = ${functionName}(${args.join(", ")});
    console.log(result);
  `;
};

const problemHandlers = {
  "two sum": (inputStr, code) => {
    if (!inputStr || typeof inputStr !== "string") {
      throw new Error("Expected input of type string for Two Sum, but got: " + typeof inputStr);
    }

    const match = inputStr.match(/nums\s*=\s*(\[[^\]]+\])\s*,\s*target\s*=\s*(\d+)/);
    if (!match) {
      throw new Error("Invalid or malformed input: " + inputStr);
    }

    const nums = JSON.parse(match[1]);
    const target = match[2];

    return `
      ${code}
      const result = twoSum(${nums}, ${target});
      console.log(result);
    `;
  },
  "longest substring without repeating characters": (inputStr, code) => {
    if (!inputStr || typeof inputStr !== "string" || inputStr.length === 0) {
      console.warn("⚠️ Skipping test: missing or empty input string:", inputStr);
      throw new Error("Missing or invalid input string for 'Longest Substring Without Repeating Characters'. Received: " + inputStr);
    }

    return `
      ${code} // User's code
      console.log(lengthOfLongestSubstring("${inputStr}")); // Avoid declaring 'result'
    `;
  },
  "merge intervals": (inputStr, code) => {
    if (!inputStr || typeof inputStr !== "string") {
      throw new Error("Invalid input for Merge Intervals, expected string");
    }
    const match = inputStr.match(/intervals\s*=\s*(\[[^\]]*\])/);
    if (!match) throw new Error("Invalid input for Merge Intervals");
    const intervals = JSON.parse(match[1]);
    return `
      ${code}
      const result = mergeIntervals(${intervals});
      console.log(result);
    `;
  },
  "word ladder": (inputStr, code) => {
    if (!inputStr || typeof inputStr !== "string") {
      throw new Error("Invalid input for Word Ladder, expected string");
    }
    const match = inputStr.match(/beginWord\s*=\s*['"](.*?)['"],\s*endWord\s*=\s*['"](.*?)['"],\s*wordList\s*=\s*(\[.*\])/);
    if (!match) throw new Error("Invalid input for Word Ladder");
    const [_, beginWord, endWord, wordList] = match;
    return `
      ${code}
      const result = ladderLength("${beginWord}", "${endWord}", ${wordList});
      console.log(result);
    `;
  },
  "binary tree level order traversal": (inputStr, code) => {
    if (!inputStr || typeof inputStr !== "string") {
      throw new Error("Invalid input for Binary Tree Level Order Traversal");
    }
    const match = inputStr.match(/root\s*=\s*(\[.*\])/);
    if (!match) throw new Error("Invalid input for Binary Tree Level Order Traversal");
    const root = JSON.parse(match[1]);
    return `
      ${code}
      function buildTree(nodes) {
        if (!Array.isArray(nodes) || nodes.length === 0 || nodes[0] === null) return null;
        const root = { val: nodes[0], left: null, right: null };
        const queue = [root];
        let i = 1;
        while (i < nodes.length) {
          const current = queue.shift();
          if (nodes[i] != null) {
            current.left = { val: nodes[i], left: null, right: null };
            queue.push(current.left);
          }
          i++;
          if (i < nodes.length && nodes[i] != null) {
            current.right = { val: nodes[i], left: null, right: null };
            queue.push(current.right);
          }
          i++;
        }
        return root;
      }
      const tree = buildTree(${root});
      const result = levelOrder(tree);
      console.log(result);
    `;
  }
};

export { problemHandlers };
