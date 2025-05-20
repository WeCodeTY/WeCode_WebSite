const express = require("express");
const router = express.Router(); // Use 'router', not 'routes'
const {
  registerUser,
  loginUser,
  logoutUser,
  getTestCasesByTitle,
  getDefaultCodeByTitle,
  googleAuth,
  allusers,
  allgoogleusers,
  alluserssignedin,
  deleteuser,
  forgotPassword,
  verifyotp,
  updateuserpassword,


  
} = require("../controllers/Route.controller");
const {
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
  adminquestionupdate,
  saveProblemHandlers
} = require("../controllers/Question.controller"); // Import updateQuestion
const {
  updateuserprofile,
  fetchuserprofile,  activityLog,
  userpointsview
} = require("../controllers/profile.controller");

const { CreateRoom, joinRoom, generateTwilioToken, endRoom } = require("../controllers/Room.controller");

const { verifyToken } = require("../middleware/auth");
const { FollowUser ,CheckFollowing, FollowDashboard,SearchUser, UnfollowUser } = require("../controllers/Follow.controller");
const multer = require("multer");
const { postcontroller , Feedcontroller } = require("../controllers/post.controller");

const upload = require("../middleware/multer");
const { submitSolution } = require("../controllers/Submit.controller");



// Define Routes
router.get("/", (req, res) => {
  res.send("Hello World this is backend");
});
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/questions_update", verifyToken, updateQuestion);
router.get("/fetch_dashboard", verifyToken, fetchquestion);
router.get("/solvedquestions" , verifyToken, getAllUserQuestions);
router.get("/userprofile", verifyToken, fetchuserprofile);
router.post("/user_update_profile", upload.single("profileImage"), verifyToken, updateuserprofile);
router.get("/create_room", verifyToken, CreateRoom);
router.post("/join_room", verifyToken, joinRoom);
router.post("/follow", verifyToken, FollowUser);
router.post("/unfollow", verifyToken, UnfollowUser);
router.post("/check-following", verifyToken, CheckFollowing);
router.get("/follow-dashboard", verifyToken, FollowDashboard);
router.post("/upload-post", upload.fields([{ name: 'posts', maxCount: 10 }]), verifyToken, postcontroller);
router.get("/Feed", verifyToken, Feedcontroller);
router.get("/SearchUser", verifyToken, SearchUser);
router.get("/questiongraph", verifyToken, questiongraph);
router.post("/create-list", verifyToken, createcustomList);
router.get("/my-lists", verifyToken, allcustomlists);
router.post("/add-question-to-list", verifyToken, addquestions);
router.post("/customlistquestions", verifyToken, viewcustomlist);
router.post("/view-list" , verifyToken, viewcustomlist);
router.post("/delete-custom-list", verifyToken, deletecustomlist);
router.post("/delete-question-from-list", verifyToken, deletequestionfromcustomlist);
router.get("/testcases/:title", getTestCasesByTitle);
router.get("/testcases/default/:title", getDefaultCodeByTitle);
router.get("/activitylog", verifyToken, activityLog);
router.post("/adminquestionsadd", verifyToken, adminquestionadd);
router.get("/allquestions", getAllAdminQuestions);
router.post("/adminquestiondelete", verifyToken, adminquestiondelete);
router.post("/adminquestionupdate", verifyToken, adminquestionupdate);
router.get("/alluserssignedin", verifyToken, alluserssignedin);
router.get("/allgoogleusers", verifyToken, allgoogleusers);
router.get("/allusers", verifyToken, allusers);
router.get("/userpoints", verifyToken, userpointsview);
router.post("/deleteuser", verifyToken, deleteuser);
router.post("/forgotpass", forgotPassword);
router.post("/verifyotp", verifyotp);
router.post("/updatepassword", updateuserpassword);
router.post("/logout", verifyToken, logoutUser);
router.post("/auth/google", googleAuth);
router.post("/submitcode", verifyToken, submitSolution);
router.post("/questionhandler" , verifyToken, saveProblemHandlers);

router.get("/twilio/video-token", generateTwilioToken);
router.post("/roomsend", verifyToken, endRoom);





module.exports = router; // Export router
