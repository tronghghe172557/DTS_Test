import UserService from "../services/user.service.js";
import { SuccessResponse } from "../utils/success.response.js";

class UserController {
  getUserProfile = async (req, res) => {
    new SuccessResponse({
      message: "User profile retrieved successfully",
      metadata: await UserService.getUser(),
    }).send(res);
  };
}

const userController = new UserController();

export default userController;
