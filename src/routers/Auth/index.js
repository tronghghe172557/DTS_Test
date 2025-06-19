import express from "express";

import asyncHandler from "../../utils/asyncHandler.util.js";
import authGuard from "../../auth/authGuard.js";
import { authController } from "../../controllers/auth.controller.js";

const authRouter = express.Router();

authRouter.post("/login", asyncHandler(authController.login));
authRouter.post("/register", asyncHandler(authController.register));
authRouter.post("/refresh-token", asyncHandler(authController.refreshToken));

authRouter.use(authGuard)
authRouter.post("/logout", asyncHandler(authController.logout));

export default authRouter;
