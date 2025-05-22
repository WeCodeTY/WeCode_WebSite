const { handleQuestion } = require("./HandlerQuestions.js");
const runCodeWithJudge0 = require("../utils/judge0.js");
const Problem = require("../models/adminquestions.model.js");

const submitSolution = async (req, res) => {
    try {
        const { code, language: lang, title } = req.body;

        const languageMapping = {
            63: "javascript", // Node.js
            71: "python",     // Python 3
            54: "cpp",        // C++ (GCC 9.2.0)
        };

        // Ensure language is correctly mapped
        const language = languageMapping[lang] || lang; // Use the passed language ID if found in the mapping, else fallback to the provided language
        console.log("Mapped language:", language); // Add logging to check language

        if (typeof language !== 'string') {
            return res.status(400).json({ error: "Invalid language format" });
        }

        if (!code || !language || !title) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        // Fetch problem details from the database based on the title
        const problem = await Problem.findOne({ title });

        if (!problem) {
            return res.status(404).json({ error: "Problem not found" });
        }

        const { testCases } = problem; // Assuming the problem has a `testCases` field
        if (!testCases || testCases.length === 0) {
            console.error("Submit Error: No test cases found for problem:", code);
            return res.status(400).json({
                error: `No test cases found for the problem titled "${title}". Please ensure the test cases are added in the database. ${code}`,
            });
        }
      console.log("Test Cases:", testCases);

        // Map supported languages to their Judge0 IDs
        const languageIds = {
            javascript: 63, // Node.js
            python: 71,     // Python 3
            cpp: 54,        // C++ (GCC 9.2.0)
        };

        const language_id = languageIds[language.toLowerCase()];
        console.log("Language ID:", language_id); // Add logging to check the language ID

        if (!language_id) {
            return res.status(400).json({ error: "Unsupported language" });
        }

        const results = [];

        for (let testCase of testCases) {
            try {
                const handlerResult = handleQuestion(title, language, testCase, code);

                const result = await runCodeWithJudge0({
                    source_code: handlerResult,
                    language_id,
                });

                const output = result.stdout?.trim() || "";
                const expectedOutputs = Array.isArray(testCase.expectedOutput)
                    ? testCase.expectedOutput.map(o => o.trim())
                    : [testCase.expectedOutput.trim()];

                const passed = expectedOutputs.includes(output);

                results.push({
                    input: testCase.input,
                    expectedOutput: expectedOutputs,
                    actualOutput: output,
                    passed,
                });
            } catch (err) {
                console.error("Error in running code:", err.message);
                return res.status(400).json({ error: err.message });
            }
        }

        console.log("Test results:", results);
        res.json({ testResults: results });
    } catch (error) {
        console.error("Error in submitSolution:", error);
        res.status(500).json({ error: "Server error during code submission." });
    }
};

module.exports = {
    submitSolution,
};