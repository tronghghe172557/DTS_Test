import { AuthService } from "../services/auth.service.js";
import { SuccessResponse } from "../utils/success.response.js";

export class AuthController {
  static async register(req, res, next) {
    new SuccessResponse({
      message: "User registered successfully",
      metadata: await AuthService.register(req.body),
    }).send(res);
  }

  static async login(req, res, next) {
    new SuccessResponse({
      message: "User login successfully",
      metadata: await AuthService.login(req.body),
    }).send(res);
  }

  static async refreshToken(req, res, next) {
    new SuccessResponse({
      message: "Refresh token logic not implemented yet",
      metadata: await AuthService.refreshToken(req.body),
    }).send(res);
  }
}
