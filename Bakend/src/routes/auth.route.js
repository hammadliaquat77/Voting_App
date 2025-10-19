import express from "express";
import { login, logout, Signup, Profile, updatePassword, getAllUsers } from "../controller/user.controller.js";
import authMiddleWare from "../middleware/auth.middleware.js";
import checkAdmin  from "../middleware/adminCheck.middleware.js";


const router = express.Router();

router.get("/", authMiddleWare, checkAdmin, getAllUsers);
router.post("/signup", Signup);
router.post("/login", login);
router.post("/logout", authMiddleWare, logout);
router.get("/profile", authMiddleWare,  Profile);
router.put("/profile/password", authMiddleWare,  updatePassword);


export default router