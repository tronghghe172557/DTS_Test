import express from "express";

import userController from "../../controllers/user.controller.js";
import asyncHandler from "../../utils/asyncHandler.util.js";
import authGuard from "../../auth/authGuard.js";
import { validate } from "../../middlewares/joiSchema.js";
import { createUser, updateUser } from "../../middlewares/user.middleware.js";

const userRouter = express.Router();

// get user profile ( get by id )
userRouter.get(
  "/profile",
  authGuard,
  asyncHandler(userController.getUserProfile)
);
// restore a user
userRouter.get("/restore/:id", asyncHandler(userController.restoreUser));

// read all users
userRouter.get("/", asyncHandler(userController.getAllUsers));

// create a user
userRouter.post(
  "/",
  validate(createUser),
  asyncHandler(userController.createUser)
);

//  get user by id
userRouter.get("/:id", asyncHandler(userController.getUserById));

// update user profile
userRouter.patch(
  "/:id",
  authGuard,
  validate(updateUser),
  asyncHandler(userController.updateUserProfile)
);

// delete a user
userRouter.delete("/:id", authGuard, asyncHandler(userController.deleteUser));

export default userRouter;
