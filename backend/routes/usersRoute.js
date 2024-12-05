import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { getUserSidebar } from "../controllers/userController.js";

const router = express.Router();

router.get("/", protectRoute, getUserSidebar);

export default router;
