import { Router } from "express";
import { isAuthenticated } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";
import {
  createCategoryController,
  deleteCategoryController,
  getCategoriesByStoreController,
  updateCategoryController,
} from "../controllers/category.controller.js";
import {
  createCategoryValidation,
  deleteCategoryValidation,
  updateCategoryValidation,
} from "../validators/category.validation.js";

const router = Router();

router.post(
  "/",
  isAuthenticated,
  authorizeRoles("ROLE_STORE_ADMIN", "ROLE_STORE_MANAGER"),
  createCategoryValidation,
  createCategoryController
);

router.get("/store/:storeId", getCategoriesByStoreController);

router.put(
  "/:id",
  isAuthenticated,
  authorizeRoles("ROLE_STORE_ADMIN", "ROLE_STORE_MANAGER"),
  updateCategoryValidation,
  updateCategoryController
);

router.delete(
  "/:id",
  isAuthenticated,
  authorizeRoles("ROLE_STORE_ADMIN", "ROLE_STORE_MANAGER"),
  deleteCategoryValidation,
  deleteCategoryController
);

export { router as categoryRoutes };
