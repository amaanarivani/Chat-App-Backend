import express from "express";
import { changePassword, checkAuth, forgetPassword, forgetPasswordOtp, getAllSuggestedUsers, getAllUsers, getCustomSingleUser, getSingleUser, Signin, signout, Signup, updateUser, verifyEmail, verifyEmailLogin } from "../controllers/user";
import auth from "../middleware/auth";
import { getAllChatMessages, getAllChatSession, sendMessages } from "../controllers/chat_session";

const router = express.Router();

router.post("/signup", Signup);
router.post("/signin", Signin);
router.get("/check-auth", auth, checkAuth);
router.post("/get-single-user", auth, getSingleUser);
router.post("/signout", signout);
router.post("/verify-email", verifyEmail);
router.post("/verify-email-login", verifyEmailLogin);
router.post("/forget-password", forgetPassword);
router.post("/forget-password-otp", forgetPasswordOtp);
router.get("/get-all-users", auth, getAllUsers);
router.post("/get-all-suggested-users", auth, getAllSuggestedUsers);
router.post("/change-password", auth, changePassword);
router.post("/update-user", auth, updateUser);
router.post("/get-custom-single-user", auth, getCustomSingleUser);


// -----------------------------chats-------------------------------------------------------------------------
router.post("/send-chat-messages", auth, sendMessages);
router.post("/get-all-chat-session", auth, getAllChatSession);
router.post("/get-all-chat-messages", auth, getAllChatMessages);



export default router;