import { body, param, validationResult } from "express-validator";
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

// ================= CREATE =================

export const createSubscriptionPlanValidation = [
  body("name").trim().notEmpty().withMessage("Plan name is required"),

  body("description").optional().isString().withMessage("Description must be a string"),

  body("price")
    .notEmpty()
    .withMessage("Price is required")
    .isNumeric()
    .withMessage("Price must be a number")
    .custom((value) => value >= 0)
    .withMessage("Price cannot be negative"),

  body("billingCycle")
    .notEmpty()
    .withMessage("Billing cycle is required")
    .isIn(["MONTHLY", "YEARLY"])
    .withMessage("Billing cycle must be MONTHLY or YEARLY"),

  body("maxBranches")
    .notEmpty()
    .withMessage("Maximum branches is required")
    .isInt({ min: 1 })
    .withMessage("Maximum branches must be at least 1"),

  body("maxUsers")
    .notEmpty()
    .withMessage("Maximum users is required")
    .isInt({ min: 1 })
    .withMessage("Maximum users must be at least 1"),

  body("maxProducts")
    .notEmpty()
    .withMessage("Maximum products is required")
    .isInt({ min: 1 })
    .withMessage("Maximum products must be at least 1"),

  body("enableAdvancedReports")
    .optional()
    .isBoolean()
    .withMessage("enableAdvancedReports must be boolean"),

  body("enableInventory")
    .optional()
    .isBoolean()
    .withMessage("enableInventory must be boolean"),

  body("enableIntegrations")
    .optional()
    .isBoolean()
    .withMessage("enableIntegrations must be boolean"),

  body("enableEcommerce")
    .optional()
    .isBoolean()
    .withMessage("enableEcommerce must be boolean"),

  body("enableInvoiceBranding")
    .optional()
    .isBoolean()
    .withMessage("enableInvoiceBranding must be boolean"),

  body("prioritySupport")
    .optional()
    .isBoolean()
    .withMessage("prioritySupport must be boolean"),

  body("enableMultiLocation")
    .optional()
    .isBoolean()
    .withMessage("enableMultiLocation must be boolean"),

  body("extraFeatures")
    .optional()
    .isArray()
    .withMessage("extraFeatures must be an array"),

  validate,
];

// ================= UPDATE =================

export const updateSubscriptionPlanValidation = [
  param("planId").isMongoId().withMessage("Invalid subscription plan id"),

  body("name").optional().trim().notEmpty().withMessage("Plan name cannot be empty"),

  body("description").optional().isString().withMessage("Description must be a string"),

  body("price")
    .optional()
    .isNumeric()
    .withMessage("Price must be a number")
    .custom((value) => value >= 0)
    .withMessage("Price cannot be negative"),

  body("billingCycle")
    .optional()
    .isIn(["MONTHLY", "YEARLY"])
    .withMessage("Billing cycle must be MONTHLY or YEARLY"),

  body("maxBranches")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Maximum branches must be at least 1"),

  body("maxUsers")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Maximum users must be at least 1"),

  body("maxProducts")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Maximum products must be at least 1"),

  body("enableAdvancedReports")
    .optional()
    .isBoolean()
    .withMessage("enableAdvancedReports must be boolean"),

  body("enableInventory")
    .optional()
    .isBoolean()
    .withMessage("enableInventory must be boolean"),

  body("enableIntegrations")
    .optional()
    .isBoolean()
    .withMessage("enableIntegrations must be boolean"),

  body("enableEcommerce")
    .optional()
    .isBoolean()
    .withMessage("enableEcommerce must be boolean"),

  body("enableInvoiceBranding")
    .optional()
    .isBoolean()
    .withMessage("enableInvoiceBranding must be boolean"),

  body("prioritySupport")
    .optional()
    .isBoolean()
    .withMessage("prioritySupport must be boolean"),

  body("enableMultiLocation")
    .optional()
    .isBoolean()
    .withMessage("enableMultiLocation must be boolean"),

  body("extraFeatures")
    .optional()
    .isArray()
    .withMessage("extraFeatures must be an array"),
];

// ================= PARAM VALIDATION =================

export const subscriptionPlanIdValidation = [
  param("planId").isMongoId().withMessage("Invalid subscription plan id"),

  validate,
];
