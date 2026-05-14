import { body, param, query, validationResult } from "express-validator";
import type { Request, Response, NextFunction } from "express";
import ApiError from "../utils/ApiError.js";

const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new ApiError({
      statusCode: 400,
      message: "Validation failed",
      errors: errors.array().map((err) => ({
        field: err.type === "field" ? err.path : "unknown",
        message: err.msg,
      })),
    });
  }

  next();
};

export const createStoreValidation = [
  body("brand")
    .notEmpty()
    .withMessage("Brand is required")
    .trim()
    .isLength({ min: 3, max: 50 })
    .withMessage("Brand must be 3-50 characters"),

  body("description")
    .notEmpty()
    .withMessage("Description is required")
    .trim()
    .isLength({ max: 500 })
    .withMessage("Description max length is 500"),

  body("storeType")
    .notEmpty()
    .withMessage("Store type is required")
    .trim()
    .isLength({ max: 50 })
    .withMessage("Store type max length is 50"),

  body("contact.address")
    .notEmpty()
    .withMessage("Address is required")
    .trim()
    .isLength({ max: 200 })
    .withMessage("Address max length is 200"),

  body("contact.phone")
    .notEmpty()
    .withMessage("Phone is required")
    .trim()
    .matches(/^\+?[0-9\s\-]{7,15}$/)
    .withMessage("Invalid phone number"),

  body("contact.email")
    .notEmpty()
    .withMessage("Email is required")
    .trim()
    .isEmail()
    .withMessage("Invalid email"),

  validate,
];

export const updateStoreValidation = [
  body("brand")
    .optional()
    .trim()
    .isLength({ min: 3, max: 50 })
    .withMessage("Brand must be 3-50 characters"),

  body("description")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage("Description max length is 500"),

  body("storeType")
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage("Store type max length is 50"),

  body("contact.address")
    .optional()
    .trim()
    .isLength({ max: 200 })
    .withMessage("Address max length is 200"),

  body("contact.phone")
    .optional()
    .trim()
    .matches(/^\+?[0-9\s\-]{7,15}$/)
    .withMessage("Invalid phone number"),

  body("contact.email").optional().trim().isEmail().withMessage("Invalid email"),

  validate,
];

export const storeIdValidation = [
  param("id")
    .notEmpty()
    .withMessage("Store ID is required")
    .isMongoId()
    .withMessage("Invalid store ID"),

  validate,
];

export const employeeStoreIdValidation = [
  param("storeId")
    .notEmpty()
    .withMessage("Store ID is required")
    .isMongoId()
    .withMessage("Invalid store ID"),

  validate,
];

export const addEmployeeValidation = [
  body("fullName")
    .notEmpty()
    .withMessage("Full name is required")
    .trim()
    .isLength({ min: 3, max: 50 })
    .withMessage("Full name must be 3-50 characters"),

  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .trim()
    .isEmail()
    .withMessage("Invalid email"),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8, max: 20 })
    .withMessage("Password must be 8-20 characters long")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/)
    .withMessage(
      "Password must contain uppercase, lowercase, number and special character"
    ),

  body("phone")
    .notEmpty()
    .withMessage("Phone number is required")
    .trim()
    .matches(/^\+?[0-9\s\-]{7,15}$/)
    .withMessage("Invalid phone number"),

  body("role")
    .notEmpty()
    .withMessage("Role is required")
    .isIn([
      "ROLE_STORE_MANAGER",
      "ROLE_BRANCH_MANAGER",
      "ROLE_BRANCH_ADMIN",
      "ROLE_BRANCH_CASHIER",
    ])
    .withMessage("Invalid employee role"),

  body("branch").optional().isMongoId().withMessage("Invalid branch ID"),

  validate,
];

export const moderateStoreValidation = [
  param("storeId")
    .notEmpty()
    .withMessage("Store ID is required")
    .isMongoId()
    .withMessage("Invalid store ID"),

  query("action")
    .notEmpty()
    .withMessage("Moderation action is required")
    .isIn(["ACTIVE", "PENDING", "BLOCKED"])
    .withMessage("Invalid moderation action"),

  validate,
];
