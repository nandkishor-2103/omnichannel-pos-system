import { Router } from "express";

import {
  getStoreOverviewController,
  getSalesTrendsController,
  getMonthlySalesController,
  getDailySalesController,
  getSalesByCategoryController,
  getSalesByPaymentMethodController,
  getSalesByBranchController,
  getPaymentBreakdownController,
  getBranchPerformanceController,
  getStoreAlertsController,
  getTodaySalesByBranchController,
} from "../controllers/storeAnalytics.controller.js";

import { isAuthenticated } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";

const router = Router();

router.use(isAuthenticated, authorizeRoles("ROLE_STORE_ADMIN", "ROLE_STORE_MANAGER"));

router.get("/:storeId/overview", getStoreOverviewController);

router.get("/:storeId/sales-trends", getSalesTrendsController);

router.get("/:storeId/sales/monthly", getMonthlySalesController);

router.get("/:storeId/sales/daily", getDailySalesController);

router.get("/:storeId/sales/category", getSalesByCategoryController);

router.get("/:storeId/sales/payment-method", getSalesByPaymentMethodController);

router.get("/:storeId/sales/branch", getSalesByBranchController);

router.get("/:storeId/payments", getPaymentBreakdownController);

router.get("/:storeId/branch-performance", getBranchPerformanceController);

router.get("/:storeId/alerts", getStoreAlertsController);

router.get("/:storeId/today-sales-by-branch", getTodaySalesByBranchController);

export { router as storeAnalyticsRoutes };
