import express from "express";
import { login, logout, sign } from "../controllers/authController.js";
import upload from "../middleware/upload.js";
const router = express.Router();

router.post("/login", login);
router.post("/signup", upload.single("profileImage"), sign);
router.post("/logout", logout);

export default router;
