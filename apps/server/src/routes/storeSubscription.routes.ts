import express from "express";

import { isAuthenticated } from "../middleware/auth.middleware.js";

import { authorizeRoles } from "../middleware/role.middleware.js";

import {
  getCurrentStoreSubscriptionController,
  getStoreSubscriptionHistoryController,
} from "../controllers/storeSubscription.controller.js";

const router = express.Router();

router.get(
  "/current",
  isAuthenticated,
  authorizeRoles("ROLE_STORE_ADMIN"),
  getCurrentStoreSubscriptionController
);

router.get(
  "/my-subscriptions",
  isAuthenticated,
  authorizeRoles("ROLE_STORE_ADMIN"),
  getStoreSubscriptionHistoryController
);

export default router;
