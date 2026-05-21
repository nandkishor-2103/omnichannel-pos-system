import type { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";

import ApiError from "../utils/ApiError.js";

const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new ApiError({
      statusCode: 400,
      message: "Validation failed",
      errors: errors.array().map((error) => ({
        field: error.type,
        message: error.msg,
      })),
    });
  }

  next();
};

export const createCustomerValidator = [
  body("fullName")
    .notEmpty()
    .withMessage("Full name is required")
    .trim()
    .isLength({ min: 3, max: 50 })
    .withMessage("Full name must be between 3 and 50 characters"),

  body("email")
    .optional()
    .trim()
    .toLowerCase()
    .isEmail()
    .withMessage("Invalid email address"),

  body("phone")
    .notEmpty()
    .withMessage("Phone number is required")
    .trim()
    .matches(/^\+?[0-9\s\-]{7,15}$/)
    .withMessage("Invalid phone number"),

  validate,
];

export const updateCustomerValidator = [
  body("fullName")
    .optional()
    .trim()
    .isLength({ min: 3, max: 50 })
    .withMessage("Full name must be between 3 and 50 characters"),

  body("email")
    .optional()
    .trim()
    .toLowerCase()
    .isEmail()
    .withMessage("Invalid email address"),

  body("phone")
    .optional()
    .trim()
    .matches(/^\+?[0-9\s\-]{7,15}$/)
    .withMessage("Invalid phone number"),

  validate,
];