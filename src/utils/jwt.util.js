import jwt from "jsonwebtoken";

import dev from "../config/env.config.js";

export class JwtUtil {
  // PAYLOAD FORMAT: user

  // generate access token
  static generateAccessToken(payload) {
    try {
      // Loại bỏ các thuộc tính JWT cũ
      const cleanPayload = this.cleanJwtPayload(payload);

      const accessToken = jwt.sign(cleanPayload, dev.jwt.access_secret, {
        expiresIn: dev.jwt.expiresIn,
      });

      return accessToken;
    } catch (error) {
      console.log("Error generating access token:", error);
      return null;
    }
  }

  // generate refresh token
  static generateRefreshToken(payload) {
    try {
      // Loại bỏ các thuộc tính JWT cũ
      const cleanPayload = this.cleanJwtPayload(payload);

      const refreshToken = jwt.sign(cleanPayload, dev.jwt.refresh_secret, {
        expiresIn: dev.jwt.expiresRefreshIn,
      });
      return refreshToken;
    } catch (error) {
      console.log("Error generating refresh token:", error);
      return null;
    }
  }

  // Helper method để clean payload
  static cleanJwtPayload(payload) {
    const { iat, exp, ...cleanPayload } = payload;
    return cleanPayload;
  }

  // verify access token
  static verifyAccessToken(token) {
    try {
      return jwt.verify(token, dev.jwt.access_secret);
    } catch (error) {
      throw new Error("Invalid access token");
    }
  }

  // verify refresh token
  static verifyRefreshToken(token) {
    try {
      return jwt.verify(token, dev.jwt.refresh_secret);
    } catch (error) {
      throw new Error("Invalid refresh token");
    }
  }

  // decode access token
  static decodeAccessToken(token) {
    try {
      return jwt.decode(token);
    } catch (error) {
      throw new Error("Error decoding access token");
    }
  }
}
