import type { NextFunction, Request, Response } from "express";
import ApiError from "../utils/ApiError.js";

const roleLabels: Record<string, string> = {
  ROLE_STORE_ADMIN: "Store Admin",
  ROLE_STORE_MANAGER: "Store Manager",
  ROLE_BRANCH_ADMIN: "Branch Admin",
  ROLE_BRANCH_MANAGER: "Branch Manager",
  ROLE_BRANCH_CASHIER: "Cashier",
};

export const authorizeRoles = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      throw new ApiError({
        statusCode: 401,
        message: "Please login to continue",
      });
    }

    // check if user role are allowed or not
    if (!roles.includes(req.user.role)) {
      const allowedRoles = roles.map((role) => roleLabels[role] ?? role).join(", ");

      throw new ApiError({
        statusCode: 403,
        message: `Only ${allowedRoles} can perform this action`,
      });
    }

    next();
  };
};
