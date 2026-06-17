import express from "express";

import {
  createSubscriptionPaymentOrderController,
  getSubscriptionPaymentHistoryController,
  verifySubscriptionPaymentController,
} from "../controllers/subscriptionPayment.controller.js";

import { isAuthenticated } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";

import {
  createSubscriptionPaymentOrderValidation,
  verifySubscriptionPaymentValidation,
} from "../validators/subscriptionPayment.validation.js";

const router = express.Router();

// ==========================================
// CREATE PAYMENT ORDER
// ==========================================

router.post(
  "/create-order",
  isAuthenticated,
  authorizeRoles("ROLE_STORE_ADMIN", "ROLE_STORE_MANAGER"),
  createSubscriptionPaymentOrderValidation,
  createSubscriptionPaymentOrderController
);

// ==========================================
// VERIFY PAYMENT
// ==========================================

router.post(
  "/verify",
  isAuthenticated,
  authorizeRoles("ROLE_STORE_ADMIN", "ROLE_STORE_MANAGER"),
  verifySubscriptionPaymentValidation,
  verifySubscriptionPaymentController
);

// ==========================================
// PAYMENT HISTORY
// ==========================================
router.get(
  "/history",
  isAuthenticated,
  authorizeRoles("ROLE_STORE_ADMIN", "ROLE_STORE_MANAGER"),
  getSubscriptionPaymentHistoryController
);
export default router;
