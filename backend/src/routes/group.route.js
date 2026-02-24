import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { addMember, createGroup, getGroups } from "../controllers/group.controller.js";

const router = express.Router();

router.get("/", protectRoute, getGroups);
router.post("/create", protectRoute, createGroup);
router.post("/add-member", protectRoute, addMember);

export default router;
