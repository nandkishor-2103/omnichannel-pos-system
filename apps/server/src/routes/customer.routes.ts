import { Router } from "express";
import {
  createCustomerController,
  updateCustomerController,
  deleteCustomerController,
  getCustomerByIdController,
  getAllCustomersController,
  searchCustomersController,
} from "../controllers/customer.controller.js";

import {
  createCustomerValidator,
  updateCustomerValidator,
} from "../validators/customer.validation.js";

import { isAuthenticated } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";

const router = Router();

router.post(
  "/",
  isAuthenticated,
  authorizeRoles("ROLE_BRANCH_CASHIER"),
  createCustomerValidator,
  createCustomerController
);

router.get(
  "/",
  isAuthenticated,
  authorizeRoles("ROLE_BRANCH_ADMIN", "ROLE_BRANCH_MANAGER", "ROLE_BRANCH_CASHIER"),
  getAllCustomersController
);

router.get(
  "/search",
  isAuthenticated,
  authorizeRoles("ROLE_BRANCH_ADMIN", "ROLE_BRANCH_MANAGER", "ROLE_BRANCH_CASHIER"),
  searchCustomersController
);

router.get(
  "/:customerId",
  isAuthenticated,
  authorizeRoles("ROLE_BRANCH_ADMIN", "ROLE_BRANCH_MANAGER", "ROLE_BRANCH_CASHIER"),
  getCustomerByIdController
);

router.put(
  "/:customerId",
  isAuthenticated,
  authorizeRoles("ROLE_BRANCH_ADMIN", "ROLE_BRANCH_MANAGER", "ROLE_BRANCH_CASHIER"),
  updateCustomerValidator,
  updateCustomerController
);

router.delete(
  "/:customerId",
  isAuthenticated,
  authorizeRoles("ROLE_BRANCH_ADMIN", "ROLE_BRANCH_MANAGER", "ROLE_BRANCH_CASHIER"),
  deleteCustomerController
);

export { router as customerRoutes };