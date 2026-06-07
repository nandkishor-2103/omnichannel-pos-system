import { Router } from "express";

import {
  getDashboardSummaryController,
  getStoreRegistrationStatsController,
  getStoreStatusDistributionController,
} from "../controllers/adminDashboard.controller.js";

import { isAuthenticated } from "../middleware/auth.middleware.js";

import { authorizeRoles } from "../middleware/role.middleware.js";

const router = Router();

/**
 * @description Dashboard Summary
 * @route GET /super-admin/dashboard/summary
 */
router.get(
  "/dashboard/summary",
  isAuthenticated,
  authorizeRoles("ROLE_ADMIN"),
  getDashboardSummaryController
);

/**
 * @description Store Registrations (Last 7 Days)
 * @route GET /super-admin/dashboard/store-registrations
 */
router.get(
  "/dashboard/store-registrations",
  isAuthenticated,
  authorizeRoles("ROLE_ADMIN"),
  getStoreRegistrationStatsController
);

/**
 * @description Store Status Distribution
 * @route GET /super-admin/dashboard/store-status-distribution
 */
router.get(
  "/dashboard/store-status-distribution",
  isAuthenticated,
  authorizeRoles("ROLE_ADMIN"),
  getStoreStatusDistributionController
);

export { router as adminDashboardRoutes };
