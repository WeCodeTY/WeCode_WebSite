const problemHandlers = {
    "two sum": (inputStr, code) => {
      const match = inputStr.match(/nums\s*=\s*(\[[^\]]+\])\s*,\s*target\s*=\s*(\d+)/);
      if (!match) throw new Error("Invalid input format");
  
      const nums = JSON.parse(match[1]);
      const target = match[2];
  
      return `
  ${code}
  
  const result = twoSum(${JSON.stringify(nums)}, ${target});
  console.log(result);
      `;
    },
  
    // Add more handlers here...
  };
  
  module.exports = { problemHandlers };