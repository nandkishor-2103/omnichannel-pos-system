import { Router } from "express";
import { signup, verifyOtp, login, logout } from "../controllers/auth.controller.js";

const router = Router();

router.post("/signup", signup);
router.post("/verify-otp", verifyOtp);
router.post("/login", login);
router.post("/logout", logout);

export { router as authRoutes };
