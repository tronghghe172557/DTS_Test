import UserService from "../services/user.service.js";
import { SuccessResponse } from "../utils/success.response.js";

class UserController {
  getUserProfile = async (req, res) => {
    const userId = req.user._id; // Assuming user ID is stored in req.user by auth middleware
    new SuccessResponse({
      message: "User profile retrieved successfully",
      metadata: await UserService.getUser(userId),
    }).send(res);
  };

  updateUserProfile = async (req, res) => {
    const userId = req.params.id; 
    new SuccessResponse({
      message: "Update user profile retrieved successfully",
      metadata: await UserService.updateUserProfile(userId),
    }).send(res);
  };
}

const userController = new UserController();

export default userController;
