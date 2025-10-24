import express from "express";
import { createCandidate, deleteCandidate, updateCandidate, getAllCandidate, userVote, voteCount, myVote  } from "../controller/candidate.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import checkAdmin  from "../middleware/adminCheck.middleware.js";
import upload from "../middleware/multer.js";


const router = express.Router();

router.get("/", getAllCandidate);
router.post("/create", upload.single("image") , authMiddleware, checkAdmin,  createCandidate);
router.put("/update/:id", authMiddleware, checkAdmin, updateCandidate);
router.delete("/delete/:id", authMiddleware, checkAdmin, deleteCandidate);
router.post("/vote/:id", authMiddleware,  userVote);
router.get("/myvote", authMiddleware, myVote);
router.get("/vote/count", voteCount);


export default router