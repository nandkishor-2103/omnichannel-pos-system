import { body, validationResult } from "express-validator";
import type { NextFunction, Request, Response } from "express";

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

export const createInventoryValidator = [
  body("branchId")
    .notEmpty()
    .withMessage("Branch ID is required")
    .isMongoId()
    .withMessage("Invalid Branch ID"),

  body("productId")
    .notEmpty()
    .withMessage("Product ID is required")
    .isMongoId()
    .withMessage("Invalid Product ID"),

  body("quantity")
    .notEmpty()
    .withMessage("Quantity is required")
    .isInt({ min: 0 })
    .withMessage("Quantity must be a positive number"),

  validate,
];

export const updateInventoryValidator = [
  body("quantity")
    .notEmpty()
    .withMessage("Quantity is required")
    .isInt({ min: 0 })
    .withMessage("Quantity must be a positive number"),

  validate,
];
