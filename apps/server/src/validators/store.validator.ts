import { body, validationResult } from "express-validator";
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
