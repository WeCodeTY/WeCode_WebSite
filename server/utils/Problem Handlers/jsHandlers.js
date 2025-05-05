const jsHandlers = {
  "two sum": (inputStr, code) => {
    console.log("Raw input:", inputStr); // Debug log

    // Normalize inputStr by removing quotes if any
    const sanitizedInput = inputStr.replace(/^"(.*)"$/, '$1').replace(/^'(.*)'$/, '$1');

    // Match array and target from the input string
    const regex = /\[([^\]]+)\][,|\s]+target\s*=\s*(\d+)/i;
    const match = sanitizedInput.match(regex);

    if (!match) {
      throw new Error("Invalid input format");
    }

    const nums = match[1].split(',').map(n => parseInt(n.trim(), 10)); // Ensure trimming and parsing
    const target = parseInt(match[2], 10);

    return `
      ${code}
      const result = twoSum(${JSON.stringify(nums)}, ${target});
      console.log(JSON.stringify(result));  // Use JSON.stringify to format the output as [0, 1]
    `;
  },

  "longest substring without repeating characters": (inputStr, code) => {
    console.log("Raw input:", inputStr); // Debug log

    // Normalize inputStr by removing quotes if any
    const sanitizedInput = inputStr.replace(/^"(.*)"$/, '$1').replace(/^'(.*)'$/, '$1');

    return `
      ${code}
      const result = lengthOfLongestSubstring("${sanitizedInput}");
      console.log(JSON.stringify(result));
    `;
  },

  "merge intervals": (inputStr, code) => {
    console.log("Raw input:", inputStr); // Debug log
    const intervals = JSON.parse(inputStr);
    return `
      ${code}
      const result = mergeIntervals(${JSON.stringify(intervals)});
      console.log(JSON.stringify(result));
    `;
  },

  "reverse linked list": (inputStr, code) => {
    console.log("Raw input:", inputStr); // Debug log

    // Convert linked list string to array
    const values = inputStr.replace("-> NULL", "").split("->").map(s => s.trim()).filter(Boolean);
    return `
      ${code}

      function createLinkedList(arr) {
        if (arr.length === 0) return null;
        const head = new ListNode(parseInt(arr[0], 10));
        let current = head;
        for (let i = 1; i < arr.length; i++) {
          current.next = new ListNode(parseInt(arr[i], 10));
          current = current.next;
        }
        return head;
      }

      function printLinkedList(head) {
        let result = "";
        while (head) {
          result += head.val + " -> ";
          head = head.next;
        }
        result += "NULL";
        return result;
      }

      const inputArr = ${JSON.stringify(values)};
      const head = createLinkedList(inputArr);
      const reversed = reverseList(head);
      console.log(JSON.stringify(printLinkedList(reversed)));
    `;
  },

  "climbing stairs": (inputStr, code) => {
    console.log("Raw input:", inputStr); // Debug log
    const n = parseInt(inputStr.trim(), 10);
    return `
      ${code}
      const result = climbStairs(${n});
      console.log(JSON.stringify(result));
    `;
  },

  "find original array from doubled array": (inputStr, code) => {
    console.log("Raw input:", inputStr);
    const arr = JSON.parse(inputStr);
    return `
      ${code}
      const result = findOriginalArray(${JSON.stringify(arr)});
      console.log(JSON.stringify(result));
    `;
  },

  "find k closest elements": (inputStr, code) => {
    console.log("Raw input:", inputStr);
    const match = inputStr.match(/\[([^\]]+)\][,|\s]+k\s*=\s*(\d+)[,|\s]+x\s*=\s*(-?\d+)/i);
    if (!match) throw new Error("Invalid input format");
    const arr = match[1].split(',').map(n => parseInt(n.trim(), 10));
    const k = parseInt(match[2], 10);
    const x = parseInt(match[3], 10);
    return `
      ${code}
      const result = findClosestElements(${JSON.stringify(arr)}, ${k}, ${x});
      console.log(JSON.stringify(result));
    `;
  },

  "reverse integer": (inputStr, code) => {
    console.log("Raw input:", inputStr);
    const x = parseInt(inputStr.trim(), 10);
    return `
      ${code}
      const result = reverse(${x});
      console.log(JSON.stringify(result));
    `;
  },

  "kth smallest element in a sorted matrix": (inputStr, code) => {
    console.log("Raw input:", inputStr);
    const parsed = JSON.parse(inputStr);
    const matrix = parsed.matrix;
    const k = parsed.k;
    return `
      ${code}
      const result = kthSmallest(${JSON.stringify(matrix)}, ${k});
      console.log(JSON.stringify(result));
    `;
  },

  "count number of bad pairs": (inputStr, code) => {
    console.log("Raw input:", inputStr);
    const nums = JSON.parse(inputStr);
    return `
      ${code}
      const result = countBadPairs(${JSON.stringify(nums)});
      console.log(JSON.stringify(result));
    `;
  },

  "largest number after mutating substring": (inputStr, code) => {
    console.log("Raw input:", inputStr);
    const [numStr, changeStr] = JSON.parse(inputStr);
    const change = changeStr.map(Number);
    return `
      ${code}
      const result = maximumNumber("${numStr}", ${JSON.stringify(change)});
      console.log(JSON.stringify(result));
    `;
  },

  "design a number container system": (inputStr, code) => {
    console.log("Raw input:", inputStr);
    const operations = JSON.parse(inputStr);
    return `
      ${code}
      const obj = new NumberContainers();
      const results = [];
      for (const [op, ...args] of ${JSON.stringify(operations)}) {
        if (op === "insert") {
          obj.insert(args[0], args[1]);
        } else if (op === "find") {
          results.push(obj.find(args[0]));
        }
      }
      console.log(JSON.stringify(results));
    `;
  },

  "find the number of distinct colors among the balls": (inputStr, code) => {
    console.log("Raw input:", inputStr);
    const [colors, queries] = JSON.parse(inputStr);
    return `
      ${code}
      const result = distinctColors(${JSON.stringify(colors)}, ${JSON.stringify(queries)});
      console.log(JSON.stringify(result));
    `;
  },

  "count elements with strictly smaller and greater elements": (inputStr, code) => {
    console.log("Raw input:", inputStr);
    const nums = JSON.parse(inputStr);
    return `
      ${code}
      const result = countElements(${JSON.stringify(nums)});
      console.log(JSON.stringify(result));
    `;
  },
};

module.exports = jsHandlers;