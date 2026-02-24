import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { handleChatRequest, searchUsers, sendChatRequest } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/search", protectRoute, searchUsers);
router.post("/chat-request/:id", protectRoute, sendChatRequest);
router.post("/handle-request", protectRoute, handleChatRequest);

export default router;
