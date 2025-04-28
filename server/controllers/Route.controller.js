const Room = require("../models/room.model");
const Post = require("../models/post.model"); // Add this import
const User = require("../models/user.model");
const Follow = require("../models/Follow.model");
const Question = require("../models/adminquestions.model");
const CustomList = require("../models/customList.model");
const ActivityLog = require("../models/activitylog.model");
const path = require("path");
const xlsx = require("xlsx");
const admin = require("firebase-admin");
const { log } = require("console");
require("dotenv").config();

if (!admin.apps.length) {
  let serviceAccount;
  try {
    serviceAccount = JSON.parse(process.env.FIREBASE_ADMIN_CREDENTIALS);
  } catch (e) {
    console.error("Failed to parse FIREBASE_ADMIN_CREDENTIALS. Make sure it is a valid JSON string.");
    throw e;
  }
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email already in use." });
    }

    const existingName = await User.findOne({ name });
    if (existingName) {
      return res.status(400).json({ message: "Username already taken." });
    }

    const user = new User({ name, email, password });
    await user.save();
    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    if (error.code === 11000 && error.keyPattern?.name) {
      return res.status(400).json({ message: "Username must be unique." });
    }
    console.error(error);
    res.status(500).json({ message: "Registration failed." });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "User not found." });
    }

    const isPasswordValid = await user.isPasswordCorrect(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password." });
    }
    const adminEmails = process.env.adminEmails.split(",").map(email => email.trim());
if (adminEmails.includes(user.email)) {
  user.role = "admin";
} else {
  user.role = "user";
}

    const accessToken = user.getAccessToken({ role: user.role });
    const refreshToken = user.getRefreshToken();

    user.refreshToken = refreshToken;
    user.points = ++user.points;
    await user.save();

    // ✅ Log login activity
    const today = new Date().toISOString().split("T")[0];
    let activityLog = await ActivityLog.findOne({ user: user._id });
    if (!activityLog) {
      activityLog = new ActivityLog({ user: user._id, logins: { [today]: 1 } });
    } else {
      activityLog.logins.set(today, (activityLog.logins.get(today) || 0) + 1);
    }
    await activityLog.save();
    
    if (!user.activitylog || !user.activitylog.equals(activityLog._id)) {
      user.activitylog = activityLog._id;
      await user.save();
    }

    const options = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };

    // ✅ Send only ONE response, include user role
    res
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .status(200)
      .json({ message: "Login successful.", role: user.role });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Login failed." });
  }
};

const logoutUser = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.status(400).json({ message: "No refresh token provided." });
    }

    // Optional: Clear the refreshToken from DB
    const user = await User.findOne({ refreshToken });
    if (user) {
      user.refreshToken = null;
      await user.save();
    }

    // Clear cookies
    res
      .clearCookie("accessToken", { httpOnly: true, secure: true, sameSite: "None" })
      .clearCookie("refreshToken", { httpOnly: true, secure: true, sameSite: "None" })
      .status(200)
      .json({ message: "Logout successful." });
  } catch (error) {
    console.error("Logout Error:", error);
    res.status(500).json({ message: "Logout failed." });
  }
};

const getTestCasesByTitle = (req, res) => {
  const title = req.params.title;
  const filePath = path.join(__dirname, "../../client/public/TestCases.xlsx");

  try {
    const workbook = xlsx.readFile(filePath);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = xlsx.utils.sheet_to_json(sheet);
    const testCases = data.filter((row) => row.Title === title);

    if (testCases.length === 0) {
      return res.status(404).json({ message: "No test cases found for this question." });
    }

    res.json(testCases);
  } catch (error) {
    console.error("Error reading test cases:", error);
    res.status(500).json({ message: "Failed to read test cases." });
  }
};

const getDefaultCodeByTitle = (req, res) => {
  const title = req.params.title;
  const filePath = path.join(__dirname, "../../client/public/TestCases.xlsx");

  try {
    const workbook = xlsx.readFile(filePath);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = xlsx.utils.sheet_to_json(sheet);
    const matching = data.find(
      (row) => row.Title?.toLowerCase() === title.toLowerCase() && row["Default Code (JS)"]
    );

    if (!matching) {
      console.log("Available titles:", data.map(row => row.Title));
      console.log("Requested title:", title);
      return res.status(404).json({ message: "No default code found for this question." });
    }

    res.json({ defaultCode: matching["Default Code (JS)"] });
  } catch (error) {
    console.error("Error reading default code:", error);
    res.status(500).json({ message: "Failed to read default code." });
  }
};


const alluserssignedin = async (req, res) => {
  try {
    const users = await User.find({ isGoogleUser: false });
    return res.status(200).json({ users });
  } catch (error) {
    return res.status(500).json({ message: "An error occurred.", error });
  }
}
const allusers = async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json({ users });
  } catch (error) {
    return res.status(500).json({ message: "An error occurred.", error });
  }
}
const deleteuser = async (req, res) => {
  try {
    const { userId } = req.body; // Get the userId from the request body

    if (!userId) {
      return res.status(400).json({ message: "User ID is required." });
    }

    // Delete all records related to the user
    await Room.deleteMany({ participants: userId });
    await Post.deleteMany({ user: userId });
    await Follow.deleteMany({ $or: [{ followerId: userId }, { followingId: userId }] });
    await CustomList.deleteMany({ user: userId });
    await ActivityLog.deleteMany({ user: userId });

    // Finally, delete the user
    const result = await User.deleteOne({ _id: userId });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "User not found." });
    }

    return res.status(200).json({ message: "User and related data deleted successfully." });
  } catch (error) {
    console.error("Error deleting user:", error);
    return res.status(500).json({ message: "An error occurred.", error });
  }
};


const allgoogleusers = async (req, res) => {
  try {
    const users = await User.find({ isGoogleUser: true });
    return res.status(200).json({ users });
  } catch (error) {
    return res.status(500).json({ message: "An error occurred.", error });
  }
}

const googleAuth = async (req, res) => {
  const { idToken } = req.body;

  try {
    
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    
    
    const { email, name, picture } = decodedToken;

    let user = await User.findOne({ email });
    if (!user) {
      let uniqueName = name;
      let count = 1;
      while (await User.findOne({ name: uniqueName })) {
        uniqueName = `${name}${count}`;
        count++;
      }

      user = new User({
        name: uniqueName,
        email,
        avatar: picture,
        isGoogleUser: true,
      });
      await user.save();
    }

    const adminEmails = process.env.adminEmails.split(",").map(email => email.trim());
    console.log(admin);
    
if (adminEmails.includes(user.email)) {
  user.role = "admin";
} else {
  user.role = "user";
}
    
    const accessToken = user.getAccessToken({ role: user.role });
    const refreshToken = user.getRefreshToken();
    user.refreshToken = refreshToken;
    user.points = ++user.points;
    await user.save();
    
    const today = new Date().toISOString().split("T")[0];
    let activityLog = await ActivityLog.findOne({ user: user._id });
    if (!activityLog) {
      activityLog = new ActivityLog({ user: user._id, logins: { [today]: 1 } });
    } else {
      activityLog.logins.set(today, (activityLog.logins.get(today) || 0) + 1);
    }
    await activityLog.save();
    
    if (!user.activitylog || !user.activitylog.equals(activityLog._id)) {
      user.activitylog = activityLog._id;
      await user.save();
    }
    
    const options = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };
    
    res
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .status(200)
      .json({ message: "Google login successful.", role: user.role });

  } catch (error) {
    console.error("Firebase Auth Error:", error.message, error.stack);
    res.status(401).json({ message: "Invalid Firebase ID token" });
  }
};

const authenticateUser = async (req, res, next) => {
  try {
    const token = req.cookies.accessToken;
    if (!token) {
      return res.status(401).json({ message: "No access token provided" });
    }

    const user = await User.getUserFromToken(token);
    if (!user) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(401).json({ message: "Unauthorized" });
  }
};

const createRoom = async (req, res) => {
  try {
    const { roomName } = req.body;
    if (!roomName) {
      return res.status(400).json({ message: "Room name is required." });
    }

    // Example schema: { name: String, createdBy: ObjectId (User), participants: [] }
    const Room = require("../models/room.model");
    const newRoom = new Room({
      name: roomName,
      createdBy: req.user._id,
      participants: [req.user._id],
    });

    await newRoom.save();
    res.status(201).json({ message: "Room created successfully", room: newRoom });
  } catch (error) {
    console.error("Error creating room:", error);
    res.status(500).json({ message: "Failed to create room." });
  }
};

const allactivitylogs = async (req, res) => {
  try {
    const activityLogs = await ActivityLog.find();
    return res.status(200).json({ activityLogs });
  } catch (error) {
    return res.status(500).json({ message: "An error occurred.", error });
  }
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getTestCasesByTitle,
  getDefaultCodeByTitle,
  googleAuth,
  authenticateUser,
  createRoom,
  allgoogleusers,
  allusers,
  alluserssignedin,
  deleteuser,
  allactivitylogs,
  
};
