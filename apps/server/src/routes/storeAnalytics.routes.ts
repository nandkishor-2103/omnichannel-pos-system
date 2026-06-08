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
} from "../controllers/storeAnalytics.controller.js";

import { isAuthenticated } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";

const router = Router();

router.use(isAuthenticated, authorizeRoles("ROLE_STORE_ADMIN", "ROLE_STORE_MANAGER"));

router.get("/:storeAdminId/overview", getStoreOverviewController);

router.get("/:storeAdminId/sales-trends", getSalesTrendsController);

router.get("/:storeAdminId/sales/monthly", getMonthlySalesController);

router.get("/:storeAdminId/sales/daily", getDailySalesController);

router.get("/:storeAdminId/sales/category", getSalesByCategoryController);

router.get("/:storeAdminId/sales/payment-method", getSalesByPaymentMethodController);

router.get("/:storeAdminId/sales/branch", getSalesByBranchController);

router.get("/:storeAdminId/payments", getPaymentBreakdownController);

router.get("/:storeAdminId/branch-performance", getBranchPerformanceController);

router.get("/:storeAdminId/alerts", getStoreAlertsController);

export { router as storeAnalyticsRoutes };
