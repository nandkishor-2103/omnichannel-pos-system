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

export const createPaymentOrderValidator = [
  body("amount")
    .notEmpty()
    .withMessage("Amount is required")
    .isFloat({ gt: 0 })
    .withMessage("Amount must be greater than 0"),

  validate,
];

export const verifyPaymentValidator = [
  body("razorpay_order_id").notEmpty().withMessage("Razorpay order id is required"),

  body("razorpay_payment_id").notEmpty().withMessage("Razorpay payment id is required"),

  body("razorpay_signature").notEmpty().withMessage("Razorpay signature is required"),

  validate,
];
