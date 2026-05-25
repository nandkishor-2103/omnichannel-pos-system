import { body, param, query, validationResult } from "express-validator";

import type { Request, Response, NextFunction } from "express";
import ApiError from "../utils/ApiError.js";

import { PaymentType } from "../enums/paymentType.enums.js";
import { OrderStatus } from "../enums/orderStatus.enums.js";

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

export const createOrderValidator = [
  body("customerId")
    .notEmpty()
    .withMessage("Customer ID is required")
    .isMongoId()
    .withMessage("Invalid customer ID"),

  body("paymentType")
    .notEmpty()
    .withMessage("Payment type is required")
    .isIn(Object.values(PaymentType))
    .withMessage("Invalid payment type"),

  body("items").isArray({ min: 1 }).withMessage("At least one order item is required"),

  body("items.*.productId")
    .notEmpty()
    .withMessage("Product ID is required")
    .isMongoId()
    .withMessage("Invalid product ID"),

  body("items.*.quantity")
    .notEmpty()
    .withMessage("Quantity is required")
    .isInt({ min: 1 })
    .withMessage("Quantity must be at least 1"),

  validate,
];

export const getOrderByIdValidator = [
  param("id").isMongoId().withMessage("Invalid order ID"),

  validate,
];

export const getOrdersByBranchValidator = [
  param("branchId")
    .notEmpty()
    .withMessage("Branch ID is required")
    .isMongoId()
    .withMessage("Invalid branch ID"),

  query("customerId").optional().isMongoId().withMessage("Invalid customer ID"),

  query("cashierId").optional().isMongoId().withMessage("Invalid cashier ID"),

  query("paymentType")
    .optional()
    .isIn(Object.values(PaymentType))
    .withMessage("Invalid payment type"),

  query("status")
    .optional()
    .isIn(Object.values(OrderStatus))
    .withMessage("Invalid order status"),

  validate,
];

export const getOrdersByCashierValidator = [
  param("cashierId")
    .notEmpty()
    .withMessage("Cashier ID is required")
    .isMongoId()
    .withMessage("Invalid cashier ID"),

  validate,
];

export const getTodayOrdersByBranchValidator = [
  param("branchId")
    .notEmpty()
    .withMessage("Branch ID is required")
    .isMongoId()
    .withMessage("Invalid branch ID"),

  validate,
];

export const getOrdersByCustomerValidator = [
  param("customerId")
    .notEmpty()
    .withMessage("Customer ID is required")
    .isMongoId()
    .withMessage("Invalid customer ID"),

  validate,
];

export const getTop5RecentOrdersByBranchValidator = [
  param("branchId")
    .notEmpty()
    .withMessage("Branch ID is required")
    .isMongoId()
    .withMessage("Invalid branch ID"),

  validate,
];

export const deleteOrderValidator = [
  param("id")
    .notEmpty()
    .withMessage("Order ID is required")
    .isMongoId()
    .withMessage("Invalid order ID"),

  validate,
];
