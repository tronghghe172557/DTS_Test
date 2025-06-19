import express from "express";
import asyncHandler from "../../utils/asyncHandler.util.js";
import { AuthController } from "../../controllers/auth.controller.js";

const authRouter = express.Router();

authRouter.post("/login", asyncHandler(AuthController.login));
authRouter.post("/register", asyncHandler(AuthController.register));
authRouter.post("/refresh-token", asyncHandler(AuthController.refreshToken));

export default authRouter;
