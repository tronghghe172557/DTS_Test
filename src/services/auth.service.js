import User from "../models/user.model.js";
import { BadRequestError } from "../utils/error.response.js";
import { JwtUtil } from "../utils/jwt.util.js";
import redis from "../dbs/init.redis.js";
import bcrypt from "bcryptjs";

class AuthService {
  async login({ email, password }) {
    const user = await User.findOne({
      email: email,
    });

    if (!user) {
      throw new BadRequestError("User does not exist with this email");
    }

    if(user.isDeleted == true) {
      throw new BadRequestError("User account is not active");
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      throw new BadRequestError("Invalid email or password");
    }

    const accessToken = JwtUtil.generateAccessToken(user.toObject());
    const refreshToken = JwtUtil.generateRefreshToken(user.toObject());

    return {
      user: user,
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  }

  async register({ email, password }) {
    const userExists = await User.findOne({
      email: email,
    });

    if (userExists) {
      throw new BadRequestError("User already exists with this email");
    }

    const newUser = new User({
      email: email,
      password: await this.hashPassword(password),
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

  async refreshToken({ refreshToken }) {
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

  async logout(token) {
    try {
      // this method will send token to blacklist
      await redis.getClient().setex(token, 60 * 60 * 24, "BlackList");
      const tokenV2 = await redis.getClient().get(token);
    } catch (error) {
      throw new BadRequestError(`Failed to logout: ${error.message}`);
    }
  }

  async isTokenBlacklisted(token) {
    // Check if the token is in the blacklist
    const blacklist = redis.getClient();
    const isBlacklisted = await blacklist.get(token);
    return !!isBlacklisted; // Returns true if blacklisted, false otherwise
  }

  async hashPassword(password) {
    return await bcrypt.hash(password, 10);
  }
}

export const authService = new AuthService();
