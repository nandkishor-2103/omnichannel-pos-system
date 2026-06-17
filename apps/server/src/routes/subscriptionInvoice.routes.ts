import express from "express";

import { isAuthenticated } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";

import {
  getSubscriptionInvoicesController,
  getSubscriptionInvoiceByIdController,
  resendSubscriptionInvoiceController,
  downloadSubscriptionInvoiceController,
} from "../controllers/subscriptionInvoice.controller.js";

const router = express.Router();

router.get(
  "/",
  isAuthenticated,
  authorizeRoles("ROLE_STORE_ADMIN", "ROLE_STORE_MANAGER"),
  getSubscriptionInvoicesController
);

router.get(
  "/:invoiceId",
  isAuthenticated,
  authorizeRoles("ROLE_STORE_ADMIN", "ROLE_STORE_MANAGER"),
  getSubscriptionInvoiceByIdController
);

router.post(
  "/:invoiceId/resend",
  isAuthenticated,
  authorizeRoles("ROLE_STORE_ADMIN", "ROLE_STORE_MANAGER"),
  resendSubscriptionInvoiceController
);

router.get(
  "/:invoiceId/download",
  isAuthenticated,
  authorizeRoles("ROLE_STORE_ADMIN", "ROLE_STORE_MANAGER"),
  downloadSubscriptionInvoiceController
);

export default router;
