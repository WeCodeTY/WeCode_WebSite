const cppHandlers = {
  "two sum": (inputStr, code) => {
    const match = inputStr.match(/nums\s*=\s*(\[[^\]]+\])\s*,\s*target\s*=\s*(\d+)/);
    if (!match) throw new Error("Invalid input format");

    const nums = JSON.parse(match[1]);
    const target = match[2];

    return `
#include <iostream>
#include <vector>
using namespace std;

vector<int> twoSum(vector<int>& nums, int target) {
    for (int i = 0; i < nums.size(); ++i) {
        for (int j = i + 1; j < nums.size(); ++j) {
            if (nums[i] + nums[j] == target) {
                return {i, j};
            }
        }
    }
    return {};
}

int main() {
    vector<int> nums = ${JSON.stringify(nums)};
    int target = ${target};

    vector<int> result = twoSum(nums, target);
    if (!result.empty()) {
        cout << "Indices: " << result[0] << ", " << result[1] << endl;
    } else {
        cout << "No solution found" << endl;
    }
}
    `;
  },

  "longest substring without repeating characters": (inputStr, code) => {
    const input = inputStr.trim().replace(/^"|"$/g, '');

    return `
#include <iostream>
#include <unordered_set>
#include <string>
using namespace std;

int lengthOfLongestSubstring(string s) {
    unordered_set<char> seen;
    int left = 0, right = 0, maxLen = 0;
    while (right < s.length()) {
        if (seen.find(s[right]) == seen.end()) {
            seen.insert(s[right]);
            maxLen = max(maxLen, right - left + 1);
            right++;
        } else {
            seen.erase(s[left]);
            left++;
        }
    }
    return maxLen;
}

int main() {
    string s = "${input}";
    cout << lengthOfLongestSubstring(s) << endl;
}
    `;
  },

  "merge intervals": (inputStr, code) => {
    const intervals = JSON.parse(inputStr);

    return `
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

vector<vector<int>> merge(vector<vector<int>>& intervals) {
    if (intervals.empty()) return {};
    sort(intervals.begin(), intervals.end());
    vector<vector<int>> merged = {intervals[0]};

    for (int i = 1; i < intervals.size(); ++i) {
        if (merged.back()[1] >= intervals[i][0]) {
            merged.back()[1] = max(merged.back()[1], intervals[i][1]);
        } else {
            merged.push_back(intervals[i]);
        }
    }
    return merged;
}

int main() {
    vector<vector<int>> intervals = ${JSON.stringify(intervals)};
    vector<vector<int>> result = merge(intervals);

    for (auto& pair : result) {
        cout << "[" << pair[0] << "," << pair[1] << "] ";
    }
    cout << endl;
}
    `;
  },

  "reverse linked list": (inputStr, code) => {
    return `
#include <iostream>
using namespace std;

struct ListNode {
    int val;
    ListNode* next;
    ListNode(int x) : val(x), next(NULL) {}
};

ListNode* reverseList(ListNode* head) {
    ListNode* prev = NULL;
    while (head) {
        ListNode* nextTemp = head->next;
        head->next = prev;
        prev = head;
        head = nextTemp;
    }
    return prev;
}

void printList(ListNode* head) {
    while (head) {
        cout << head->val << " -> ";
        head = head->next;
    }
    cout << "NULL" << endl;
}

int main() {
    ListNode* head = new ListNode(1);
    head->next = new ListNode(2);
    head->next->next = new ListNode(3);
    head->next->next->next = new ListNode(4);
    head->next->next->next->next = new ListNode(5);

    ListNode* reversed = reverseList(head);
    printList(reversed);
}
    `;
  },

  "climbing stairs": (inputStr, code) => {
    const n = parseInt(inputStr.trim());

    return `
#include <iostream>
using namespace std;

int climbStairs(int n) {
    if (n <= 2) return n;
    int a = 1, b = 2;
    for (int i = 3; i <= n; ++i) {
        int temp = a + b;
        a = b;
        b = temp;
    }
    return b;
}

int main() {
    int n = ${n};
    cout << climbStairs(n) << endl;
}
    `;
  },

  // You can add more problems here as needed.
};

module.exports = cppHandlers;
