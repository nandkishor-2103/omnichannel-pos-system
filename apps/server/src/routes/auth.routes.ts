import { Router } from "express";
import { signup, verifyOtp } from "../controllers/auth.controller.js";

const router = Router();

router.post("/signup", signup);
router.post("/verify-otp", verifyOtp);

export default router;
