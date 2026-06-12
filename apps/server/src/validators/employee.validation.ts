import type { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import ApiError from "../utils/ApiError.js";

const validate = (req: Request, res: Response, next: NextFunction): void => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new ApiError({
      statusCode: 400,
      message: "Validation failed",
      errors: errors.array().map((err) => ({
        field: err.type,
        message: err.msg,
      })),
    });
  }

  next();
};

const validRoles = [
  "ROLE_STORE_ADMIN",
  "ROLE_STORE_MANAGER",
  "ROLE_BRANCH_MANAGER",
  "ROLE_BRANCH_ADMIN",
  "ROLE_BRANCH_CASHIER",
];

export const createEmployeeValidator = [
  body("fullName")
    .notEmpty()
    .withMessage("Full name is required")
    .trim()
    .isLength({ min: 3, max: 30 })
    .withMessage("Full name must be between 3 and 30 characters"),

  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .trim()
    .toLowerCase()
    .isEmail()
    .withMessage("Please provide a valid email"),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)
    .withMessage("Password must contain upper, lower, number & special character"),

  body("phone")
    .notEmpty()
    .withMessage("Phone is required")
    .trim()
    .matches(/^\+?[0-9\s\-]{7,15}$/)
    .withMessage("Invalid phone number"),

  body("role")
    .notEmpty()
    .withMessage("Role is required")
    .isIn(validRoles)
    .withMessage("Invalid role"),

  validate,
];

export const updateEmployeeValidator = [
  body("fullName")
    .optional()
    .trim()
    .isLength({ min: 3, max: 30 })
    .withMessage("Full name must be between 3 and 30 characters"),

  body("email")
    .optional()
    .trim()
    .toLowerCase()
    .isEmail()
    .withMessage("Please provide a valid email"),

  body("password")
    .optional({ values: "falsy" })
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)
    .withMessage("Password must contain upper case, lower case, number & special character"),

  body("phone")
    .optional()
    .trim()
    .matches(/^\+?[0-9\s\-]{7,15}$/)
    .withMessage("Invalid phone number"),

  body("role").optional().isIn(validRoles).withMessage("Invalid role"),

  validate,
];
