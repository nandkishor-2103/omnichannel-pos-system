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

export const createRefundValidator = [
  body("orderId")
    .notEmpty()
    .withMessage("Order ID is required")
    .isMongoId()
    .withMessage("Invalid order ID"),

  body("branchId")
    .notEmpty()
    .withMessage("Branch ID is required")
    .isMongoId()
    .withMessage("Invalid branch ID"),

  body("reason")
    .notEmpty()
    .withMessage("Refund reason is required")
    .trim()
    .isLength({ min: 3, max: 500 })
    .withMessage("Reason must be between 3 and 500 characters"),

  validate,
];

export const getRefundByIdValidator = [
  param("id")
    .notEmpty()
    .withMessage("Refund ID is required")
    .isMongoId()
    .withMessage("Invalid refund ID"),

  validate,
];

export const getRefundsByCashierValidator = [
  param("cashierId")
    .notEmpty()
    .withMessage("Cashier ID is required")
    .isMongoId()
    .withMessage("Invalid cashier ID"),

  validate,
];

export const getRefundsByBranchValidator = [
  param("branchId")
    .notEmpty()
    .withMessage("Branch ID is required")
    .isMongoId()
    .withMessage("Invalid branch ID"),

  validate,
];

export const getRefundsByShiftReportValidator = [
  param("shiftReportId")
    .notEmpty()
    .withMessage("Shift report ID is required")
    .isMongoId()
    .withMessage("Invalid shift report ID"),

  validate,
];

export const getRefundsByCashierAndDateRangeValidator = [
  param("cashierId")
    .notEmpty()
    .withMessage("Cashier ID is required")
    .isMongoId()
    .withMessage("Invalid cashier ID"),

  query("from")
    .notEmpty()
    .withMessage("From date is required")
    .isISO8601()
    .withMessage("Invalid from date"),

  query("to")
    .notEmpty()
    .withMessage("To date is required")
    .isISO8601()
    .withMessage("Invalid to date"),

  validate,
];

export const deleteRefundValidator = [
  param("id")
    .notEmpty()
    .withMessage("Refund ID is required")
    .isMongoId()
    .withMessage("Invalid refund ID"),

  validate,
];
