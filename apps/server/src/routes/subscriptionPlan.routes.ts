import express from "express";

import {
  createSubscriptionPlanController,
  getAllSubscriptionPlansController,
  getSubscriptionPlanByIdController,
  updateSubscriptionPlanController,
  deleteSubscriptionPlanController,
  activateSubscriptionPlanController,
  deactivateSubscriptionPlanController,
} from "../controllers/subscriptionPlan.controller.js";

import { isAuthenticated } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";

import {
  createSubscriptionPlanValidation,
  updateSubscriptionPlanValidation,
  subscriptionPlanIdValidation,
} from "../validators/subscriptionPlan.validation.js";

const router = express.Router();

// ================= CREATE =================

router.post(
  "/",
  isAuthenticated,
  authorizeRoles("ROLE_ADMIN"),
  createSubscriptionPlanValidation,
  createSubscriptionPlanController
);

// ================= GET ALL =================

router.get(
  "/",
  isAuthenticated,
  authorizeRoles("ROLE_ADMIN", "ROLE_STORE_ADMIN", "ROLE_STORE_MANAGER"),
  getAllSubscriptionPlansController
);

// ================= GET BY ID =================

router.get(
  "/:planId",
  isAuthenticated,
  authorizeRoles("ROLE_ADMIN", "ROLE_STORE_ADMIN", "ROLE_STORE_MANAGER"),
  subscriptionPlanIdValidation,
  getSubscriptionPlanByIdController
);

// ================= UPDATE =================

router.put(
  "/:planId",
  isAuthenticated,
  authorizeRoles("ROLE_ADMIN"),
  updateSubscriptionPlanValidation,
  updateSubscriptionPlanController
);

// ================= DELETE =================

router.delete(
  "/:planId",
  isAuthenticated,
  authorizeRoles("ROLE_ADMIN"),
  subscriptionPlanIdValidation,
  deleteSubscriptionPlanController
);

// ================= ACTIVATE =================

router.patch(
  "/:planId/activate",
  isAuthenticated,
  authorizeRoles("ROLE_ADMIN"),
  subscriptionPlanIdValidation,
  activateSubscriptionPlanController
);

// ================= DEACTIVATE =================

router.patch(
  "/:planId/deactivate",
  isAuthenticated,
  authorizeRoles("ROLE_ADMIN"),
  subscriptionPlanIdValidation,
  deactivateSubscriptionPlanController
);

export default router;
