import { Router } from "express";

import {
  createPaymentOrderController,
  verifyPaymentController,
} from "../controllers/payment.controller.js";

import {
  createPaymentOrderValidator,
  verifyPaymentValidator,
} from "../validators/payment.validator.js";

const router = Router();

router.post(
  "/create-order",
  createPaymentOrderValidator,
  createPaymentOrderController
);

router.post("/verify", verifyPaymentValidator, verifyPaymentController);

export default router;
