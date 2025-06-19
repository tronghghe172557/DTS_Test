import User from "../models/user.model.js";

class UserService {
  static async getUser(userId) {
    return await User.findById(userId)
      .select("-password -__v")
      .lean()
      .exec();  
  }

  static async createUser(req, res) {}

  static async updateUser(req, res) {}

  static async deleteUser(req, res) {}
  s;
}

export default UserService;
