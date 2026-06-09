import { Router } from "express";

import {
  startShiftController,
  endShiftController,
  getCurrentShiftProgressController,
  getShiftReportByIdController,
  getAllShiftReportsController,
  getShiftReportsByCashierController,
  getShiftReportsByBranchController,
  getShiftReportByCashierAndDateController,
  deleteShiftReportController,
  pauseShiftController,
  resumeShiftController,
} from "../controllers/shiftReport.controller.js";

import { isAuthenticated } from "../middleware/auth.middleware.js";

import { authorizeRoles } from "../middleware/role.middleware.js";

import {
  startShiftValidator,
  getShiftReportByIdValidator,
  getShiftReportsByCashierValidator,
  getShiftReportsByBranchValidator,
  getShiftReportByCashierAndDateValidator,
  deleteShiftReportValidator,
} from "../validators/shiftReport.validators.js";

const router = Router();

/**
 * @description Start shift
 * @route POST /shift-reports/start
 */
router.post(
  "/start",
  isAuthenticated,
  authorizeRoles("ROLE_BRANCH_CASHIER"),
  startShiftValidator,
  startShiftController
);

router.patch(
  "/pause",
  isAuthenticated,
  authorizeRoles("ROLE_BRANCH_CASHIER"),
  pauseShiftController
);

router.patch(
  "/resume",
  isAuthenticated,
  authorizeRoles("ROLE_BRANCH_CASHIER"),
  resumeShiftController
);

/**
 * @description End shift
 * @route PATCH /shift-reports/end
 */
router.patch(
  "/end",
  isAuthenticated,
  authorizeRoles("ROLE_BRANCH_CASHIER"),
  endShiftController
);

/**
 * @description Current shift progress
 * @route GET /shift-reports/current
 */
router.get(
  "/current",
  isAuthenticated,
  authorizeRoles("ROLE_BRANCH_CASHIER"),
  getCurrentShiftProgressController
);

/**
 * @description Get shift by cashier and date
 * @route GET /shift-reports/cashier/:cashierId/by-date
 */
router.get(
  "/cashier/:cashierId/by-date",
  isAuthenticated,
  getShiftReportByCashierAndDateValidator,
  getShiftReportByCashierAndDateController
);

/**
 * @description Get shifts by cashier
 * @route GET /shift-reports/cashier/:cashierId
 */
router.get(
  "/cashier/:cashierId",
  isAuthenticated,
  getShiftReportsByCashierValidator,
  getShiftReportsByCashierController
);

/**
 * @description Get shifts by branch
 * @route GET /shift-reports/branch/:branchId
 */
router.get(
  "/branch/:branchId",
  isAuthenticated,
  getShiftReportsByBranchValidator,
  getShiftReportsByBranchController
);

/**
 * @description Get all shifts
 * @route GET /shift-reports
 */
router.get("/", isAuthenticated, getAllShiftReportsController);

/**
 * @description Get shift by ID
 * @route GET /shift-reports/:id
 */
router.get(
  "/:id",
  isAuthenticated,
  getShiftReportByIdValidator,
  getShiftReportByIdController
);

/**
 * @description Delete shift report
 * @route DELETE /shift-reports/:id
 */
router.delete(
  "/:id",
  isAuthenticated,
  authorizeRoles("ROLE_STORE_ADMIN", "ROLE_STORE_MANAGER"),
  deleteShiftReportValidator,
  deleteShiftReportController
);

export { router as shiftReportRoutes };
