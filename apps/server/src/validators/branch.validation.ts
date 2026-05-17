import { body, param, validationResult } from "express-validator";
import type { Request, Response, NextFunction } from "express";
import ApiError from "../utils/ApiError.js";

const validate = (req: Request, res: Response, next: NextFunction): void => {
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

export const createBranchValidation = [
  body("name")
    .notEmpty()
    .withMessage("Branch name is required")
    .trim()
    .isLength({ min: 2, max: 100 }),

  body("address")
    .notEmpty()
    .withMessage("Address is required")
    .trim()
    .isLength({ min: 5, max: 500 })
    .withMessage("Address must be 5-500 characters"),

  body("phone")
    .notEmpty()
    .withMessage("Phone is required")
    .trim()
    .matches(/^\+?[0-9\s\-]{7,15}$/)
    .withMessage("Invalid phone number"),

  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email address"),

  body("workingDays").isArray({ min: 1 }).withMessage("Working days are required"),

  body("workingDays.*")
    .isIn(["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"])
    .withMessage("Invalid working day"),

  body("openTime")
    .notEmpty()
    .withMessage("Open time is required")
    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/)
    .withMessage("Open time must be in HH:mm format"),

  body("closeTime")
    .notEmpty()
    .withMessage("Close time is required")
    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/)
    .withMessage("Close time must be in HH:mm format"),

  body("storeId")
    .notEmpty()
    .withMessage("Store ID is required")
    .isMongoId()
    .withMessage("Invalid store ID"),

  validate,
];

export const updateBranchValidation = [
  body("name")
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage("Branch name must be 2-100 characters"),

  body("address")
    .optional()
    .trim()
    .isLength({ min: 5, max: 500 })
    .withMessage("Address must be 5-500 characters"),

  body("phone")
    .optional()
    .trim()
    .matches(/^\+?[0-9\s\-]{7,15}$/)
    .withMessage("Invalid phone number"),

  body("email")
    .optional()
    .isEmail()
    .withMessage("Invalid email address"),

  body("workingDays")
    .optional()
    .isArray({ min: 1 })
    .withMessage("Working days must be an array with at least one day"),

  body("workingDays.*")
    .optional()
    .isIn(["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"])
    .withMessage("Invalid working day"),

  body("openTime")
    .optional()
    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/)
    .withMessage("Open time must be in HH:mm format"),

  body("closeTime")
    .optional()
    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/)
    .withMessage("Close time must be in HH:mm format"),

  validate,
];
