import { authService } from "../services/auth.service.js";
import { SuccessResponse } from "../utils/success.response.js";

class AuthController {
  async register(req, res, next) {
    new SuccessResponse({
      message: "User registered successfully",
      metadata: await authService.register(req.body),
    }).send(res);
  }

  async login(req, res, next) {
    new SuccessResponse({
      message: "User login successfully",
      metadata: await authService.login(req.body),
    }).send(res);
  }

  async refreshToken(req, res, next) {
    new SuccessResponse({
      message: "Refresh token successfully",
      metadata: await authService.refreshToken(req.body),
    }).send(res);
  }

  async logout(req, res, next) {
    const  token = req.token;
    await authService.logout(token);
    new SuccessResponse({
      message: "Logout successfully",
    }).send(res);
  }
}

export const authController = new AuthController();