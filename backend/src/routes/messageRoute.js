import express from "express";
import { getMessages, getUsersForSidebar, sendMessage } from "../controllers/messageController.js";
import { protectRoute } from "../middleware/authMiddleware.js";

const messageRoute = express.Router();

messageRoute.get("/users",protectRoute,getUsersForSidebar)
messageRoute.get("/:id",protectRoute,getMessages)

messageRoute.post("/send/:id", protectRoute, sendMessage);
export default messageRoute;