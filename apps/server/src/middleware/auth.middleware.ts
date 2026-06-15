import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import ENV_VAR from "../config/env.js";

interface JwtPayload {
  userId: string;
}

export const isAuthenticated = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.infotactToken;

    if (!token) {
      throw new ApiError({
        statusCode: 401,
        message: "Unauthorized, Please login!",
      });
    }

    const decoded = jwt.verify(token, ENV_VAR.JWT_SECRET as string) as JwtPayload;

    const user = await User.findById(decoded.userId)
      .select("-password")
      .populate("store", "status");

    if (!user) {
      throw new ApiError({
        statusCode: 401,
        message: "User not found",
      });
    }

    const store = user.store as {
      status?: string;
    };

    if (store?.status === "INACTIVE") {
      res.clearCookie("infotactToken");

      throw new ApiError({
        statusCode: 403,
        message: "Store has been deactivated",
      });
    }

    req.user = user;

    next();
  }
);
