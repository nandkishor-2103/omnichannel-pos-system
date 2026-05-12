import type { NextFunction, Request, Response } from "express";
import ApiError from "../utils/ApiError.js";

export const authorizeRoles = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      throw new ApiError({
        statusCode: 401,
        message: "Unauthorized",
      });
    }

    // Check if user role is allowed
    if (!roles.includes(req.user.role)) {
      throw new ApiError({
        statusCode: 403,
        message: "Access denied",
      });
    }
    next();
  };
};
