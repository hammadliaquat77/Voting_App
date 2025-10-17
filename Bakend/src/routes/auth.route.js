import express from "express";
import { login, logout, Signup, Profile, updatePassword } from "../controller/user.controller.js";
import authMiddleWare from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup", Signup);
router.post("/login", login);
router.post("/logout", authMiddleWare, logout);
router.get("/profile", authMiddleWare,  Profile);
router.put("/profile/password", authMiddleWare,  updatePassword);


export default router