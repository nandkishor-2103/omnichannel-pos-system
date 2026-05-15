import { body, param, validationResult } from "express-validator";
import type { Request, Response, NextFunction } from "express";
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

export const createCategoryValidation = [
  body("name")
    .notEmpty()
    .withMessage("Category name is required")
    .trim()
    .isLength({
      min: 2,
      max: 50,
    })
    .withMessage("Category name must be 2-50 characters"),

  body("storeId")
    .notEmpty()
    .withMessage("Store ID is required")
    .isMongoId()
    .withMessage("Invalid store ID"),

  validate,
];

export const updateCategoryValidation = [
  param("id").isMongoId().withMessage("Invalid category ID"),

  body("name")
    .optional()
    .trim()
    .isLength({
      min: 2,
      max: 50,
    })
    .withMessage("Category name must be 2-50 characters"),

  validate,
];

export const deleteCategoryValidation = [
  param("id").isMongoId().withMessage("Invalid category ID"),

  validate,
];
