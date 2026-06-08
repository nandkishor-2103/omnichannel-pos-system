import { Router } from "express";

import {
  getDailySalesChartController,
  getTopProductsController,
  getTopCashiersController,
  getCategorySalesController,
  getTodayOverviewController,
  getPaymentBreakdownController,
} from "../controllers/branchAnalytics.controller.js";

import { isAuthenticated } from "../middleware/auth.middleware.js";

import { authorizeRoles } from "../middleware/role.middleware.js";

const router = Router();

/**
 * GET /branch-analytics/daily-sales
 */
router.get(
  "/daily-sales",
  isAuthenticated,
  authorizeRoles("ROLE_BRANCH_ADMIN", "ROLE_BRANCH_MANAGER"),
  getDailySalesChartController
);

/**
 * GET /branch-analytics/top-products
 */
router.get(
  "/top-products",
  isAuthenticated,
  authorizeRoles("ROLE_BRANCH_ADMIN", "ROLE_BRANCH_MANAGER"),
  getTopProductsController
);

/**
 * GET /branch-analytics/top-cashiers
 */
router.get(
  "/top-cashiers",
  isAuthenticated,
  authorizeRoles("ROLE_BRANCH_ADMIN", "ROLE_BRANCH_MANAGER"),
  getTopCashiersController
);

/**
 * GET /branch-analytics/category-sales
 */
router.get(
  "/category-sales",
  isAuthenticated,
  authorizeRoles("ROLE_BRANCH_ADMIN", "ROLE_BRANCH_MANAGER"),
  getCategorySalesController
);

/**
 * GET /branch-analytics/today-overview
 */
router.get(
  "/today-overview",
  isAuthenticated,
  authorizeRoles("ROLE_BRANCH_ADMIN", "ROLE_BRANCH_MANAGER"),
  getTodayOverviewController
);

/**
 * GET /branch-analytics/payment-breakdown
 */
router.get(
  "/payment-breakdown",
  isAuthenticated,
  authorizeRoles("ROLE_BRANCH_ADMIN", "ROLE_BRANCH_MANAGER"),
  getPaymentBreakdownController
);

export { router as branchAnalyticsRoutes };
