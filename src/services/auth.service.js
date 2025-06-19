import User from "../models/user.model.js";
import { BadRequestError } from "../utils/error.response.js";
import { JwtUtil } from "../utils/jwt.util.js";

export class AuthService {
  static async login({ email, password }) {
    const user = await User.findOne({
      email: email,
    });

    if (!user) {
      throw new BadRequestError("User does not exist with this email");
    }

    if (password !== user.password) {
      throw new BadRequestError("Invalid password");
    }

    const accessToken = JwtUtil.generateAccessToken(user.toObject());
    const refreshToken = JwtUtil.generateRefreshToken(user.toObject());

    return {
      user: user,
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  }

  static async register({ email, password }) {
    const userExists = await User.findOne({
      email: email,
    });

    if (userExists) {
      throw new BadRequestError("User already exists with this email");
    }

    const newUser = new User({
      email: email,
      password: password,
    });

    const userInDb = await newUser.save();
    if (!userInDb) {
      throw new BadRequestError("User registration failed");
    }

    const accessToken = JwtUtil.generateAccessToken(userInDb.toObject());
    const refreshToken = JwtUtil.generateRefreshToken(userInDb.toObject());

    return {
      user: userInDb,
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  }

  static async refreshToken({ refreshToken }) {
    try {
      const payload = JwtUtil.verifyRefreshToken(refreshToken);

      if (!payload) {
        throw new BadRequestError("Invalid refresh token");
      }

      // Lấy user mới nhất từ database
      const user = await User.findById(payload._id);
      if (!user) {
        throw new BadRequestError("User not found");
      }

      // Tạo token mới từ user data mới nhất
      const newAccessToken = JwtUtil.generateAccessToken(user.toObject());
      if (!newAccessToken) {
        throw new BadRequestError("Failed to generate new access token");
      }

      return {
        accessToken: newAccessToken,
        refreshToken: refreshToken,
      };
    } catch (error) {
      console.log("Error in refreshToken:", error);
      throw new BadRequestError("Invalid refresh token");
    }
  }

  static async logout(token) {
    if (token === "fake-jwt-token") {
      return { success: true, message: "User logged out successfully" };
    } else {
      throw new Error("Invalid token");
    }
  }
}
