import { Router } from "express";

import {
  createRefundController,
  getAllRefundsController,
  getRefundsByCashierController,
  getRefundsByBranchController,
  getRefundsByShiftReportController,
  getRefundsByCashierAndDateRangeController,
  getRefundByIdController,
  deleteRefundController,
} from "../controllers/refund.controller.js";

import { isAuthenticated } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";

import {
  createRefundValidator,
  getRefundByIdValidator,
  getRefundsByCashierValidator,
  getRefundsByBranchValidator,
  getRefundsByShiftReportValidator,
  getRefundsByCashierAndDateRangeValidator,
  deleteRefundValidator,
} from "../validators/refund.validators.js";

const router = Router();

/**
 * @description Create refund
 * @route POST /refunds
 * @access Private
 * @roles ROLE_BRANCH_CASHIER
 */
router.post(
  "/",
  isAuthenticated,
  authorizeRoles("ROLE_BRANCH_CASHIER"),
  createRefundValidator,
  createRefundController
);

/**
 * @description Get all refunds
 * @route GET /refunds
 * @access Private
 * @roles ROLE_BRANCH_MANAGER, ROLE_BRANCH_ADMIN
 */
router.get(
  "/",
  isAuthenticated,
  authorizeRoles("ROLE_BRANCH_MANAGER", "ROLE_BRANCH_ADMIN"),
  getAllRefundsController
);

/**
 * @description Get all refund between particular date
 * @route GET /cashier/123/range?from=2026-06-01T00:00:00.000Z&to=2026-06-30T23:59:59.999Z
 * IMPORTANT:
 * Put range route before cashier route
 * to avoid route conflicts.
 */
router.get(
  "/cashier/:cashierId/range",
  isAuthenticated,
  getRefundsByCashierAndDateRangeValidator,
  getRefundsByCashierAndDateRangeController
);

/**
 * @description Get refunds by cashier
 * @route GET /refunds/cashier/:cashierId
 */
router.get(
  "/cashier/:cashierId",
  isAuthenticated,
  getRefundsByCashierValidator,
  getRefundsByCashierController
);

/**
 * @description Get refunds by branch
 * @route GET /refunds/branch/:branchId
 */
router.get(
  "/branch/:branchId",
  isAuthenticated,
  getRefundsByBranchValidator,
  getRefundsByBranchController
);

/**
 * @description Get refunds by shift report
 * @route GET /refunds/shift/:shiftReportId
 */
router.get(
  "/shift/:shiftReportId",
  isAuthenticated,
  getRefundsByShiftReportValidator,
  getRefundsByShiftReportController
);

/**
 * @description Get refund by ID
 * @route GET /refunds/:id
 */
router.get("/:id", isAuthenticated, getRefundByIdValidator, getRefundByIdController);

/**
 * @description Delete refund
 * @route DELETE /refunds/:id
 * @roles ROLE_STORE_ADMIN, ROLE_STORE_MANAGER
 */
router.delete(
  "/:id",
  isAuthenticated,
  authorizeRoles("ROLE_STORE_ADMIN", "ROLE_STORE_MANAGER"),
  deleteRefundValidator,
  deleteRefundController
);

export { router as refundRoutes };
