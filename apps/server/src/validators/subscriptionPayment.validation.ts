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
// ==================================================
// CREATE PAYMENT ORDER
// ==================================================

export const createSubscriptionPaymentOrderValidation = [
  body("subscriptionPlanId")
    .notEmpty()
    .withMessage("Subscription plan ID is required")
    .isMongoId()
    .withMessage("Invalid subscription plan ID"),

  validate,
];

// ==================================================
// VERIFY PAYMENT
// ==================================================

export const verifySubscriptionPaymentValidation = [
  body("razorpay_order_id").notEmpty().withMessage("Razorpay order ID is required"),

  body("razorpay_payment_id").notEmpty().withMessage("Razorpay payment ID is required"),

  body("razorpay_signature").notEmpty().withMessage("Razorpay signature is required"),

  validate,
];
