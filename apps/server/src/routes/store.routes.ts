import { Router } from "express";
import {
  createStoreController,
  getStoreByIdController,
  updateStoreController,
  deleteStoreController,
  getAdminStoreController,
  getEmployeeStoreController,
  getStoreEmployeesController,
  addEmployeeController,
  getAllStoresController,
  moderateStoreController,
} from "../controllers/store.controller.js";
import { isAuthenticated } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";
import {
  createStoreValidation,
  updateStoreValidation,
  storeIdValidation,
  employeeStoreIdValidation,
  addEmployeeValidation,
  moderateStoreValidation,
} from "../validators/store.validator.js";

const router = Router();

// ===================== CREATE STORE ✅ =====================
router.post(
  "/",
  isAuthenticated,
  authorizeRoles("ROLE_STORE_ADMIN"),
  createStoreValidation,
  createStoreController
);

// ===================== GET ALL STORES ✅ =====================
router.get("/", isAuthenticated, authorizeRoles("ROLE_ADMIN"), getAllStoresController);

// ===================== GET ADMIN STORE ✅ =====================
router.get(
  "/admin",
  isAuthenticated,
  authorizeRoles("ROLE_STORE_ADMIN"),
  getAdminStoreController
);

// ===================== GET EMPLOYEE STORE ✅ =====================
router.get(
  "/employee",
  isAuthenticated,
  authorizeRoles(
    "ROLE_STORE_MANAGER",
    "ROLE_BRANCH_MANAGER",
    "ROLE_BRANCH_ADMIN",
    "ROLE_BRANCH_CASHIER"
  ),
  getEmployeeStoreController
);

// ===================== GET STORE EMPLOYEES ✅ =====================
router.get(
  "/:storeId/employee/list",
  isAuthenticated,
  authorizeRoles("ROLE_STORE_ADMIN", "ROLE_STORE_MANAGER"),
  employeeStoreIdValidation,
  getStoreEmployeesController
);

// ===================== ADD EMPLOYEE ✅ =====================
router.post(
  "/add/employee",
  isAuthenticated,
  authorizeRoles("ROLE_STORE_ADMIN", "ROLE_STORE_MANAGER"),
  addEmployeeValidation,
  addEmployeeController
);

// ===================== MODERATE STORE (Only Super Admin) ✅ =====================
router.put(
  "/:storeId/moderate",
  isAuthenticated,
  authorizeRoles("ROLE_ADMIN"),
  moderateStoreValidation,
  moderateStoreController
);

// ===================== GET STORE BY ID ✅ =====================
router.get(
  "/:id",
  isAuthenticated,
  authorizeRoles(
    "ROLE_ADMIN",
    "ROLE_STORE_ADMIN",
    "ROLE_STORE_MANAGER",
    "ROLE_BRANCH_MANAGER",
    "ROLE_BRANCH_ADMIN",
    "ROLE_BRANCH_CASHIER"
  ),
  storeIdValidation,
  getStoreByIdController
);

// ===================== UPDATE STORE =====================
router.put(
  "/:id",
  isAuthenticated,
  authorizeRoles("ROLE_STORE_ADMIN"),
  storeIdValidation,
  updateStoreValidation,
  updateStoreController
);

// ===================== DELETE STORE =====================
router.delete(
  "/:id",
  isAuthenticated,
  authorizeRoles("ROLE_STORE_ADMIN"),
  storeIdValidation,
  deleteStoreController
);

export { router as storeRoutes };
