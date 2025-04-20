const User = require("../models/user.model");
const CustomList = require("../models/customList.model");


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
        const customlist = new CustomList({ name: listname, questions: [], userEmail: req.user.email });
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
        const customLists = await CustomList.find({ userEmail: req.user.email });
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
        console.log("Deleting from list:", listId, "question:", questionId);
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
    questiongraph
};