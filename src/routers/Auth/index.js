import express from "express";

import asyncHandler from "../../utils/asyncHandler.util.js";
import authGuard from "../../auth/authGuard.js";
import { authController } from "../../controllers/auth.controller.js";
import { validate } from "../../middlewares/joiSchema.js";
import { loginSchema, registerSchema } from "../../validations/auth.validation.js";

const authRouter = express.Router();

authRouter.post("/login", validate(loginSchema), asyncHandler(authController.login));
authRouter.post("/register", validate(registerSchema), asyncHandler(authController.register));
authRouter.post("/refresh-token", asyncHandler(authController.refreshToken));

authRouter.use(authGuard)
authRouter.post("/logout", asyncHandler(authController.logout));

export default authRouter;
