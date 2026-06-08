import { Router } from "express";
import {
  createInventoryController,
  deleteInventoryController,
  getInventoryByBranchController,
  getInventoryByIdController,
  getInventoryByProductIdController,
  updateInventoryController,
} from "../controllers/inventory.controller.js";

import {
  createInventoryValidator,
  updateInventoryValidator,
} from "../validators/inventory.validation.js";

import { isAuthenticated } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";

const router = Router();

router.post(
  "/",
  isAuthenticated,
  authorizeRoles("ROLE_STORE_MANAGER", "ROLE_BRANCH_MANAGER"),
  createInventoryValidator,
  createInventoryController
);

router.put(
  "/:id",
  isAuthenticated,
  authorizeRoles("ROLE_STORE_MANAGER", "ROLE_BRANCH_MANAGER"),
  updateInventoryValidator,
  updateInventoryController
);

router.delete(
  "/:id",
  isAuthenticated,
  authorizeRoles("ROLE_STORE_MANAGER", "ROLE_BRANCH_MANAGER"),
  deleteInventoryController
);

router.get("/:id", isAuthenticated, getInventoryByIdController);

router.get("/product/:productId", isAuthenticated, getInventoryByProductIdController);

router.get("/branch/:branchId", isAuthenticated, getInventoryByBranchController);

export { router as inventoryRoutes };
