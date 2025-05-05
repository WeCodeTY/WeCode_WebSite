const User = require("../models/user.model");
const CustomList = require("../models/customList.model");
const Problem = require("../models/adminquestions.model");



// Admin add question
const adminquestionadd = async (req, res) => {
    try {
        const { topic, title, difficulty, revision, important, link, problemStatement, sampleInput, sampleOutput, constraints, testCases } = req.body;
        const existingQuestion = await Problem.findOne({ title });
        if (existingQuestion) {
            return res.status(400).json({ message: "Question already exists." });
        }
        const newQuestion = new Problem({
            topic,
            title,
            difficulty,
            revision,
            important,
            link,
            problemStatement,
            sampleInput,
            sampleOutput,
            constraints,
            testCases
        });
        await newQuestion.save();
        return res.status(200).json({ message: "Question added successfully." });
    } catch (error) {
        console.error("Error adding question:", error);
        return res.status(500).json({ message: "Failed to add question." });
    }
};
const adminquestiondelete = async(req , res) => {
    try {
        const {topic , title} = req.body;
        const deletedQuestion = await Problem.findOneAndDelete({ title });
        if (!deletedQuestion) {
            return res.status(404).json({ message: "Question not found." });
        }
        return res.status(200).json({ message: "Question deleted successfully." });
    } catch (error) {
        console.error("Error deleting question:", error);
        return res.status(500).json({ message: "Failed to delete question." });
        }
}

const adminquestionupdate = async(req , res) => {
    try {
        const { topic, title, difficulty, revision, important, link, problemStatement, sampleInput, sampleOutput, constraints } = req.body;
        const updatedQuestion = await Problem.findOneAndUpdate({ title }, { topic, difficulty, revision, important, link, problemStatement, sampleInput, sampleOutput, constraints }, { new: true });
        if (!updatedQuestion) {
            return res.status(404).json({ message: "Question not found." });
        }
        return res.status(200).json({ message: "Question updated successfully." });
    } catch (error) {
        console.error("Error updating question:", error);
        return res.status(500).json({ message: "Failed to update question." });
   } 
}
const getAllAdminQuestions = async (req, res) => {
    try {
      const questions = await Problem.find(); // Fetch all questions
      return res.status(200).json({ questions });
    } catch (error) {
      console.error("Error fetching questions:", error);
      return res.status(500).json({ message: "Failed to fetch questions." });
    }
  };

const updateQuestion = async (req, res) => {
    try {
        const { title ,questionId, field, value } = req.body;

        const user = await User.findOne({ email: req.user.email });
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }
        
        const questionIndex = user.questions.findIndex(q => q.questionId === questionId);

        if (questionIndex !== -1) {
            // Update specific field
            user.questions[questionIndex][field.toLowerCase()] = value === "Yes";
            if(field.toLowerCase() === "important" && value === "Yes"){
                user.questions[questionIndex].timestamp = new Date();
            }
        } else {
            // Create new question entry with the correct field
            const newQuestion = {
                title,
                questionId,
                revision: field === "Revision" ? value === "Yes" : false,
                important: field === "Important" ? value === "Yes" : false,
            timestamp: value === "Yes" ? new Date() : null
            };
            user.questions.push(newQuestion);
        }

        await user.save();
        return res.status(200).json({ message: "Question updated successfully." });
    } catch (error) {
        return res.status(500).json({ message: "An error occurred.", error });
    }
};

const fetchquestion = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.user.email });
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }
        const importantQuestions = user.questions.filter(q => q.important);
        const revisionQuestions = user.questions.filter(q => q.revision);
        return res.status(200).json({ importantQuestions, revisionQuestions });
    } catch (error) {
        return res.status(500).json({ message: "An error occurred.", error });
    }
};

const getAllUserQuestions = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.user.email });
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        return res.status(200).json({ questions: user.questions });
    } catch (error) {
        return res.status(500).json({ message: "An error occurred.", error });
    }
};

const createcustomList = async (req, res) => {
    try {
        const { listname } = req.body;
        const user = await User.findOne({ email: req.user.email });
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }
        const customlist = new CustomList({ name: listname, questions: [], user: req.user._id });
        await customlist.save();
        user.customLists.push(customlist._id);
        await user.save();
        return res.status(200).json({ message: "Custom list created successfully." });
    } catch (error) {
        return res.status(500).json({ message: "An error occurred.", error });
    }

}

const allcustomlists = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.user.email });
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }
        const customLists = await CustomList.find({ user: req.user._id });
        return res.status(200).json({ customLists });
    } catch (error) {
        return res.status(500).json({ message: "An error occurred.", error });
    }

}

const addquestions = async (req, res) => {
    try {
        const { listId, questionId } = req.body;
        const user = await User.findOne({ email: req.user.email });
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }
        const customList = await CustomList.findById(listId);
        if (!customList) {
            return res.status(404).json({ message: "Custom list not found." });
        }
        if (!customList.questions.includes(questionId)) {
            customList.questions.push(questionId);
            await customList.save();
        }
        return res.status(200).json({ message: "Question added to custom list." });
    } catch (error) {
        return res.status(500).json({ message: "An error occurred.", error });
    }
}

const viewcustomlist = async (req, res) => {
    try {
        const { listId } = req.body;
        const user = await User.findOne({ email: req.user.email });
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }
        const customList = await CustomList.findById(listId);
        if (!customList) {
            return res.status(404).json({ message: "Custom list not found." });
        }
        return res.status(200).json({ questions: customList.questions });
    } catch (error) {
        return res.status(500).json({ message: "An error occurred.", error });
    }
}

const deletecustomlist = async (req, res) => {
    try {
        const { listId } = req.body;
        const user = await User.findOne({ email: req.user.email });
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }
        const customList = await CustomList.findByIdAndDelete(listId);
        if (!customList) {
            return res.status(404).json({ message: "Custom list not found." });
        }
        // Just remove the custom list reference from the user's customLists
        user.customLists = user.customLists.filter(id => id.toString() !== listId);
        await user.save();
        return res.status(200).json({ message: "Custom list and its questions deleted successfully." });
    } catch (error) {
        return res.status(500).json({ message: "An error occurred.", error });

    }

}

const deletequestionfromcustomlist = async (req, res) => {
    try {
        const { listId, questionId } = req.body;
        const user = await User.findOne({ email: req.user.email });
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }
        const customList = await CustomList.findById(listId);
        if (!customList) {
            return res.status(404).json({ message: "Custom list not found." });
        }
        customList.questions = customList.questions.filter(q => q.toString() !== questionId);
        await customList.save();
        return res.status(200).json({ message: "Question deleted from custom list." });
    } catch (error) {
        return res.status(500).json({ message: "An error occurred.", error });
    }
}

const questiongraph = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.user.email });
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }
        const titlecount = {};
        user.questions.forEach(question => {
            if (!question.title) return;
            if (question.title in titlecount) {
                titlecount[question.title]++;
            } else {
                titlecount[question.title] = 1;
            }
        });
        return res.status(200).json({ titlecount });
    } catch (error) {
        return res.status(500).json({ message: "An error occurred.", error });
    }
}

module.exports = {
    updateQuestion,
    fetchquestion,
    getAllUserQuestions,
    createcustomList,
    allcustomlists,
    addquestions,
    viewcustomlist,
    deletecustomlist,
    deletequestionfromcustomlist,
    questiongraph,
    adminquestionadd,
    getAllAdminQuestions,
    adminquestiondelete,
    adminquestionupdate
};