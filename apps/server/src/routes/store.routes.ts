import { Router } from "express";
import { createStoreController } from "../controllers/store.controller.js";
import { isAuthenticated } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";
import { createStoreValidation } from "../validators/store.validator.js";

const router = Router();

router.post(
  "/",
  isAuthenticated,
  authorizeRoles("ROLE_STORE_ADMIN"),
  createStoreValidation,
  createStoreController
);

export { router as storeRoutes };
