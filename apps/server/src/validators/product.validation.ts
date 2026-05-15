import { body, param, query, validationResult } from "express-validator";
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

export const createProductValidation = [
  body("name")
    .notEmpty()
    .withMessage("Product name is required")
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage("Product name must be 2-100 characters"),

  body("sku")
    .notEmpty()
    .withMessage("SKU is required")
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("SKU must be 2-50 characters"),

  body("description")
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage("Description max length is 1000"),

  body("mrp")
    .notEmpty()
    .withMessage("MRP is required")
    .isFloat({ min: 0 })
    .withMessage("MRP must be positive"),

  body("sellingPrice")
    .notEmpty()
    .withMessage("Selling price is required")
    .isFloat({ min: 0 })
    .withMessage("Selling price must be positive"),

  body("brand")
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage("Brand max length is 100"),

  body("image").optional().trim().isURL().withMessage("Image must be valid URL"),

  body("category")
    .notEmpty()
    .withMessage("Category ID is required")
    .isMongoId()
    .withMessage("Invalid category ID"),

  body("store")
    .notEmpty()
    .withMessage("Store ID is required")
    .isMongoId()
    .withMessage("Invalid store ID"),

  validate,
];

export const updateProductValidation = [
  param("id").isMongoId().withMessage("Invalid product id"),

  body("name")
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage("Product name must be 2-100 characters"),

  body("sku")
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("SKU must be 2-50 characters"),

  body("description")
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage("Description max length is 1000"),

  body("mrp").optional().isFloat({ min: 0 }).withMessage("MRP must be positive"),

  body("sellingPrice")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Selling price must be positive"),

  body("brand")
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage("Brand max length is 100"),

  body("image").optional().trim().isURL().withMessage("Image must be valid URL"),

  body("category").optional().isMongoId().withMessage("Invalid category id"),

  body("store").optional().isMongoId().withMessage("Invalid store ID"),

  validate,
];

export const productIdValidation = [
  param("id").isMongoId().withMessage("Invalid product id"),

  validate,
];

export const storeIdValidation = [
  param("storeId").isMongoId().withMessage("Invalid store id"),

  validate,
];

export const searchProductValidation = [
  param("storeId").isMongoId().withMessage("Invalid store id"),

  query("q").notEmpty().withMessage("Search query is required"),

  validate,
];
