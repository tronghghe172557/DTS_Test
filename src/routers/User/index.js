import express from 'express';

import  userController  from '../../controllers/user.controller.js'
import asyncHandler from '../../utils/asyncHandler.util.js'
import authGuard from '../../auth/authGuard.js';

const userRouter = express.Router();

// public routes

// private routes
userRouter.get('/profile', authGuard, asyncHandler(userController.getUserProfile))

export default userRouter;