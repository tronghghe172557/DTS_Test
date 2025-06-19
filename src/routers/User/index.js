import express from 'express';

import  userController  from '../../controllers/user.controller.js'
import asyncHandler from '../../utils/asyncHandler.util.js'

const userRouter = express.Router();

// public routes
userRouter.get('/profile', asyncHandler(userController.getUserProfile))

// private routes

export default userRouter;