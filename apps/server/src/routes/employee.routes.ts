import { Router } from "express";

import {
  createBranchEmployeeController,
  createStoreEmployeeController,
  deleteEmployeeController,
  disableEmployeeController,
  enableEmployeeController,
  getBranchEmployeesController,
  getEmployeeByIdController,
  getStoreEmployeesController,
  updateEmployeeController,
} from "../controllers/employee.controller.js";

import {
  createEmployeeValidator,
  updateEmployeeValidator,
} from "../validators/employee.validation.js";

import { isAuthenticated } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";

const router = Router();

router.post(
  "/store/:storeId",
  isAuthenticated,
  authorizeRoles("ROLE_STORE_ADMIN", "ROLE_STORE_MANAGER"),
  createEmployeeValidator,
  createStoreEmployeeController
);

router.post(
  "/branch/:branchId",
  isAuthenticated,
  authorizeRoles("ROLE_BRANCH_ADMIN", "ROLE_BRANCH_MANAGER"),
  createEmployeeValidator,
  createBranchEmployeeController
);

router.put(
  "/:employeeId",
  isAuthenticated,
  authorizeRoles(
    "ROLE_STORE_ADMIN",
    "ROLE_STORE_MANAGER",
    "ROLE_BRANCH_ADMIN",
    "ROLE_BRANCH_MANAGER"
  ),
  updateEmployeeValidator,
  updateEmployeeController
);

router.delete(
  "/:employeeId",
  isAuthenticated,
  authorizeRoles("ROLE_STORE_ADMIN", "ROLE_BRANCH_ADMIN"),
  deleteEmployeeController
);

router.patch(
  "/:employeeId/enable",
  isAuthenticated,
  authorizeRoles(
    "ROLE_STORE_ADMIN",
    "ROLE_BRANCH_ADMIN",
    "ROLE_STORE_MANAGER",
    "ROLE_BRANCH_MANAGER"
  ),
  enableEmployeeController
);

router.patch(
  "/:employeeId/disable",
  isAuthenticated,
  authorizeRoles(
    "ROLE_STORE_ADMIN",
    "ROLE_BRANCH_ADMIN",
    "ROLE_STORE_MANAGER",
    "ROLE_BRANCH_MANAGER"
  ),
  disableEmployeeController
);

router.get(
  "/store/:storeId",
  isAuthenticated,
  authorizeRoles("ROLE_STORE_ADMIN", "ROLE_STORE_MANAGER"),
  getStoreEmployeesController
);

router.get(
  "/branch/:branchId",
  isAuthenticated,
  authorizeRoles("ROLE_BRANCH_ADMIN", "ROLE_BRANCH_MANAGER"),
  getBranchEmployeesController
);

router.get(
  "/:employeeId",
  isAuthenticated,
  authorizeRoles(
    "ROLE_STORE_ADMIN",
    "ROLE_STORE_MANAGER",
    "ROLE_BRANCH_ADMIN",
    "ROLE_BRANCH_MANAGER"
  ),
  getEmployeeByIdController
);

export { router as employeeRoutes };
