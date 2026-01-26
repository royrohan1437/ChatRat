import express from "express";
import {
  accessChat,
  createGroupChat,
  fetchChats,
} from "../controllers/chat.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", protectRoute, accessChat);
router.post("/group", protectRoute, createGroupChat);
router.get("/", protectRoute, fetchChats);

export default router;
