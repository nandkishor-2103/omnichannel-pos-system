import { Router } from "express";
import {
  createOrderController,
  deleteOrderController,
  getOrderByIdController,
  getOrdersByBranchController,
  getOrdersByCashierController,
  getOrdersByCustomerController,
  getTodayOrdersByBranchController,
  getTop5RecentOrdersByBranchController,
} from "../controllers/order.controller.js";

import { isAuthenticated } from "../middleware/auth.middleware.js";

import { authorizeRoles } from "../middleware/role.middleware.js";

import {
  createOrderValidator,
  getOrderByIdValidator,
  getOrdersByBranchValidator,
  getOrdersByCashierValidator,
  getOrdersByCustomerValidator,
  getTodayOrdersByBranchValidator,
  getTop5RecentOrdersByBranchValidator,
  deleteOrderValidator,
} from "../validators/order.validators.js";

const router = Router();

/**
 * @description Create order
 * @route POST /orders
 * @access Private
 * @roles ROLE_BRANCH_CASHIER
 */
router.post(
  "/",
  isAuthenticated,
  authorizeRoles("ROLE_BRANCH_CASHIER"),
  createOrderValidator,
  createOrderController
);

/**
 * @description Get order by ID
 * @route GET /orders/:id
 * @access Public
 * @roles All
 * @param {string} id - Order ID
 */
router.get("/:id", isAuthenticated, getOrderByIdValidator, getOrderByIdController);

/**
 * @description Get orders by branch ID
 * @route GET /orders/branch/:branchId
 * @access Public
 * @roles All
 * @param {string} branchId - Branch ID
 */
router.get(
  "/branch/:branchId",
  isAuthenticated,
  getOrdersByBranchValidator,
  getOrdersByBranchController
);

/**
 * @description Get orders by cashier ID
 * @route GET /orders/cashier/:cashierId
 * @access Public
 * @roles All
 * @param {string} cashierId - Cashier ID
 */
router.get(
  "/cashier/:cashierId",
  isAuthenticated,
  getOrdersByCashierValidator,
  getOrdersByCashierController
);

/**
 * @description Get today orders by branch ID
 * @route GET /orders/today/branch/:branchId
 * @access Public
 * @roles All
 * @param {string} branchId - Branch ID
 */
router.get(
  "/today/branch/:branchId",
  isAuthenticated,
  getTodayOrdersByBranchValidator,
  getTodayOrdersByBranchController
);

/**
 * @description Get customer orders by customer ID
 * @route GET /orders/customer/:customerId
 * @access Public
 * @roles All
 * @param {string} customerId - Customer ID
 */
router.get(
  "/customer/:customerId",
  isAuthenticated,
  getOrdersByCustomerValidator,
  getOrdersByCustomerController
);

/**
 * @description Get top 5 recent orders by branch ID
 * @route GET /orders/recent/:branchId
 * @access Private
 * @roles ROLE_BRANCH_MANAGER, ROLE_BRANCH_ADMIN
 * @param {string} branchId - Branch ID
 */
router.get(
  "/recent/:branchId",
  isAuthenticated,
  authorizeRoles("ROLE_BRANCH_MANAGER", "ROLE_BRANCH_ADMIN"),
  getTop5RecentOrdersByBranchValidator,
  getTop5RecentOrdersByBranchController
);

/**
 * @description Delete order by ID
 * @route DELETE /orders/:id
 * @access Private
 * @roles ROLE_STORE_MANAGER, ROLE_STORE_ADMIN
 * @param {string} id - Order ID
 */
router.delete(
  "/:id",
  isAuthenticated,
  authorizeRoles("ROLE_STORE_MANAGER", "ROLE_STORE_ADMIN"),
  deleteOrderValidator,
  deleteOrderController
);

export { router as orderRoutes };
