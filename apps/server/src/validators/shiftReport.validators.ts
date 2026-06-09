import { param, query, validationResult } from "express-validator";

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

/**
 * POST /shift-reports/start
 */
export const startShiftValidator = [
  query("branchId")
    .notEmpty()
    .withMessage("Branch ID is required")
    .isMongoId()
    .withMessage("Invalid branch ID"),

  validate,
];

/**
 * PATCH /shift-reports/end
 */
export const endShiftValidator = [validate];

/**
 * GET /shift-reports/current
 */
export const getCurrentShiftValidator = [validate];

/**
 * GET /shift-reports/:id
 */
export const getShiftReportByIdValidator = [
  param("id")
    .notEmpty()
    .withMessage("Shift report ID is required")
    .isMongoId()
    .withMessage("Invalid shift report ID"),

  validate,
];

/**
 * GET /shift-reports/cashier/:cashierId
 */
export const getShiftReportsByCashierValidator = [
  param("cashierId")
    .notEmpty()
    .withMessage("Cashier ID is required")
    .isMongoId()
    .withMessage("Invalid cashier ID"),

  validate,
];

/**
 * GET /shift-reports/branch/:branchId
 */
export const getShiftReportsByBranchValidator = [
  param("branchId")
    .notEmpty()
    .withMessage("Branch ID is required")
    .isMongoId()
    .withMessage("Invalid branch ID"),

  validate,
];

/**
 * GET /shift-reports/cashier/:cashierId/by-date?date=
 */
export const getShiftReportByCashierAndDateValidator = [
  param("cashierId")
    .notEmpty()
    .withMessage("Cashier ID is required")
    .isMongoId()
    .withMessage("Invalid cashier ID"),

  query("date")
    .notEmpty()
    .withMessage("Date is required")
    .isISO8601()
    .withMessage("Invalid date format"),

  validate,
];

/**
 * DELETE /shift-reports/:id
 */
export const deleteShiftReportValidator = [
  param("id")
    .notEmpty()
    .withMessage("Shift report ID is required")
    .isMongoId()
    .withMessage("Invalid shift report ID"),

  validate,
];
