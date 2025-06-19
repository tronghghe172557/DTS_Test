import asyncHandler from "../utils/asyncHandler.util.js";
import { AuthFailureError } from "../utils/error.response.js";
import { JwtUtil } from "../utils/jwt.util.js";

export const authGuard = asyncHandler(async (req, _, next ) => {
    try {
        const bearToken = req.headers.authorization;
        if(!bearToken || !bearToken.startsWith("Bearer")) {
            throw new AuthFailureError(`BearerToken is required`);
        }

        const token = bearToken.replace("Bearer", "").trim();
        if(!token) {
            throw new AuthFailureError(`Token is required`);
        }

        // check token in black list

        // verify token
        const { user } = JwtUtil.verifyAccessToken(token);
        if(!user) {
            throw new AuthFailureError(`Invalid token`);
        }

        req.user = user;
        next();
    } catch (error) {
        next(error);
    }
})