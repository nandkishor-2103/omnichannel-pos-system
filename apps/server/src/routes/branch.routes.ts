import { Router } from "express";
import {
  createBranchController,
  deleteBranchController,
  getBranchByIdController,
  getBranchesByStoreController,
  updateBranchController,
} from "../controllers/branch.controller.js";
import { isAuthenticated } from "../middleware/auth.middleware.js";
import {
  createBranchValidation,
  updateBranchValidation,
} from "../validators/branch.validation.js";
import { authorizeRoles } from "../middleware/role.middleware.js";

const router = Router();

router.post(
  "/",
  isAuthenticated,
  authorizeRoles("ROLE_STORE_ADMIN", "ROLE_STORE_MANAGER"),
  createBranchValidation,
  createBranchController
);

router.get("/store/:storeId", isAuthenticated, getBranchesByStoreController);

router.get("/:id", isAuthenticated, getBranchByIdController);

router.put("/:id", isAuthenticated, authorizeRoles("ROLE_STORE_ADMIN", "ROLE_STORE_MANAGER"), updateBranchValidation, updateBranchController);

router.delete("/:id", isAuthenticated, authorizeRoles("ROLE_STORE_ADMIN",), deleteBranchController);

export { router as branchRoutes };
