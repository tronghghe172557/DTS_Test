import UserService from "../services/user.service.js";
import { ForbiddenError } from "../utils/error.response.js";
import {
  Created,
  NoContent,
  SuccessResponse,
} from "../utils/success.response.js";

class UserController {
  getAllUsers = async (req, res) => {
    new SuccessResponse({
      message: "Get all Users successfully",
      metadata: await UserService.getAllUsers(),
    }).send(res);
  };

  getUserById = async (req, res) => {
    const userId = req.params.id; 
    new SuccessResponse({
      message: "User by id successfully",
      metadata: await UserService.getUser(userId),
    }).send(res);
  };

  getUserProfile = async (req, res) => {
    const userId = req.user._id; // Assuming user ID is stored in req.user by auth middleware
    new SuccessResponse({
      message: "User profile retrieved successfully",
      metadata: await UserService.getUser(userId),
    }).send(res);
  };

  createUser = async (req, res) => {
    new Created({
      message: "Create user profile retrieved successfully",
      metadata: await UserService.createUser(req.body),
    }).send(res);
  };

  updateUserProfile = async (req, res) => {
    const userId = req.params.id;
    new SuccessResponse({
      message: "Update user profile retrieved successfully",
      metadata: await UserService.updateUserProfile(userId, req.body),
    }).send(res);
  };

  deleteUser = async (req, res) => {
    const userId = req.params.id;
    if (userId !== req.user._id.toString() || !userId) {
      throw new ForbiddenError("You are not allowed to delete this user");
    }
    //
    await UserService.deleteUser(userId, req.token);
    new NoContent({
      message: "Update user profile retrieved successfully",
    }).send(res);
  };

  restoreUser = async (req, res) => {
    const userId = req.params.id;
    new SuccessResponse({
      message: "Restore user profile retrieved successfully",
      metadata: await UserService.restoreUser(userId),
    }).send(res);
  };
}

const userController = new UserController();

export default userController;
