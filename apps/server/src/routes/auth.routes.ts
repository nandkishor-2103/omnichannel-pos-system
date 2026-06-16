import { Router } from "express";
import { signup, verifyOtp, login, logout, forgotPassword, verifyResetOtp, resetPassword } from "../controllers/auth.controller.js";

const router = Router();

router.post("/signup", signup);
router.post("/verify-otp", verifyOtp);
router.post("/forgot-password", forgotPassword);
router.post("/verify-reset-otp", verifyResetOtp);
router.post("/reset-password", resetPassword);
router.post("/signin", login);
router.post("/logout", logout);

export { router as authRoutes };
