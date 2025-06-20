import User from "../models/user.model.js";
import { BadRequestError } from "../utils/error.response.js";
import { authService } from "./auth.service.js";
class UserService {
  static async getAllUsers() {
    return await User.find({ isDeleted: false })
      .select("-password -__v")
      .lean()
      .exec();
  }

  static async getUser(userId) {
    return await User.findById(userId).select("-password -__v").lean().exec();
  }

  static async createUser(userBody) {
    const userExists = await User.findOne({ email: userBody.email })
      .lean()
      .exec();
    if (userExists) {
      throw new BadRequestError("User already exists with this email");
    }

    return await User.create(userBody);
  }

  static async updateUserProfile(userId, userBody) {
    const udpatedUser = await User.findByIdAndUpdate(userId, userBody, {
      new: true,
      runValidators: true,
    })
      .select("-password -__v")
      .lean()
      .exec();

    if (!udpatedUser) {
      throw new BadRequestError("User not found");
    }

    return udpatedUser;
  }

  static async deleteUser(userId, token) {
    const deletedUser = await User.findById(userId)
      .select("-password -__v")
      .lean()
      .exec();
    if (!deletedUser) {
      throw new BadRequestError("User not found");
    }

    await User.updateOne(
      { _id: userId },
      { $set: { isDeleted: true, deletedAt: Date.now() } }
    ).exec();

    // add token to blacklist
    await authService.logout(token);
    console.warn("User deleted successfully, token added to blacklist");
  }

  static async restoreUser(userId) {
    const restoredUser = await User.findByIdAndUpdate(
      userId,
      { isDeleted: false, deletedAt: null },
      { new: true, runValidators: true }
    )
      .select("-password -__v")
      .lean()
      .exec();

    if (!restoredUser) {
      throw new BadRequestError("User not found");
    }

    return restoredUser;
  }
}

export default UserService;
