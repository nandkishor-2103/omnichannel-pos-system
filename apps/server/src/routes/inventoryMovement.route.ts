import express from "express";

import { isAuthenticated } from "../middleware/auth.middleware.js";

import {
  getInventoryMovementsController,
  getInventoryMovementsByProductController,
} from "../controllers/inventoryMovement.controller.js";

const router = express.Router();

router.get("/", isAuthenticated, getInventoryMovementsController);

router.get("/product/:productId", isAuthenticated, getInventoryMovementsByProductController);

export default router;
