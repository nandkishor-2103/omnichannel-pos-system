import { Router } from "express";
import {
  createProductController,
  deleteProductController,
  getProductByIdController,
  getProductsByStoreController,
  searchProductsController,
  updateProductController,
} from "../controllers/product.controller.js";
import { isAuthenticated } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";
import {
  createProductValidation,
  productIdValidation,
  searchProductValidation,
  storeIdValidation,
  updateProductValidation,
} from "../validators/product.validation.js";

const router = Router();

/**
 * @desc   Create a new product
 * @route  POST /api/products
 * @access Private (Store Admin, Store Manager)
 */
router.post(
  "/",
  isAuthenticated,
  authorizeRoles("ROLE_STORE_ADMIN", "ROLE_STORE_MANAGER"),
  createProductValidation,
  createProductController
);

/**
 * @desc   Search for products
 * @route  GET /api/products/store/:storeId/search?q=abc
 * @access Private (Store Admin, Store Manager)
 */
router.get(
  "/store/:storeId/search",
  isAuthenticated,
  searchProductValidation,
  searchProductsController
);

/**
 * @desc   Get products by store
 * @route  GET /api/products/store/:storeId
 * @access Private (Store Admin, Store Manager)
 */
router.get(
  "/store/:storeId",
  isAuthenticated,
  storeIdValidation,
  getProductsByStoreController
);

/**
 * @desc   Get product by ID
 * @route  GET /api/products/:id
 * @access Private (Store Admin, Store Manager)
 */
router.get("/:id", isAuthenticated, productIdValidation, getProductByIdController);

/**
 * @desc   Update product
 * @route  PATCH /api/products/:id
 * @access Private (Store Admin, Store Manager)
 */
router.patch(
  "/:id",
  isAuthenticated,
  authorizeRoles("ROLE_STORE_ADMIN", "ROLE_STORE_MANAGER"),
  updateProductValidation,
  updateProductController
);

/**
 * @desc   Delete product
 * @route  DELETE /api/products/:id
 * @access Private (Store Admin, Store Manager)
 */
router.delete(
  "/:id",
  isAuthenticated,
  authorizeRoles("ROLE_STORE_ADMIN", "ROLE_STORE_MANAGER"),
  productIdValidation,
  deleteProductController
);

export { router as productRoutes };
