import express from "express";
import { checkAuth, login, logout, signup, updateProfile } from "../controllers/authController.js";
import { protectRoute } from "../middleware/authMiddleware.js";

const authRoute = express.Router();

authRoute.post("/signup",signup);
authRoute.post("/login",login)
authRoute.post("/logout",logout)

authRoute.put("/update-profile",protectRoute,updateProfile)

authRoute.get("/check", protectRoute, checkAuth);
export default authRoute;