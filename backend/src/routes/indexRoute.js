import express from "express";
import authRoute from "./authRoute.js";
import messageRoute from "./messageRoute.js";

const rootRouter = express.Router();

rootRouter.use("/auth",authRoute)
rootRouter.use("/messages", messageRoute)
export default rootRouter;