import { ArrowLeftIcon, ShoppingCartIcon, Eye, EyeOff, Home } from "lucide-react";
import { useEffect, useState } from "react";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import {
  forgotPassword,
  resetPassword,
  signin,
  verifyResetOtp,
} from "@/app/store/auth/authThunk";

import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { useNavigate } from "react-router-dom";

import type { UserRole } from "./types/types";

import LoadingSpinner from "@/components/shared/LoadingSpinner";
import { getStoreStatusMessage } from "@/lib/storeStatus";
import { toast } from "sonner";

const roleRoutes: Record<UserRole, string> = {
  ROLE_ADMIN: "/super-admin/dashboard",

  ROLE_STORE_ADMIN: "/store/dashboard",

  ROLE_STORE_MANAGER: "/store/dashboard",

  ROLE_BRANCH_ADMIN: "/branch/dashboard",

  ROLE_BRANCH_MANAGER: "/branch/dashboard",

  ROLE_BRANCH_CASHIER: "/cashier",
};

export default function Login() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [forgotStep, setForgotStep] = useState<"EMAIL" | "OTP" | "PASSWORD">("EMAIL");

  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const [otp, setOtp] = useState("");

  const [newPassword, setNewPassword] = useState("");

  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [showNewPassword, setShowNewPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const loading = useAppSelector((state) => state.auth.loading);

  const handleLogin = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const resultAction = await dispatch(signin(formData));

    if (signin.fulfilled.match(resultAction)) {
      const loggedInUser = resultAction.payload.payload.user;

      if (loggedInUser.role === "ROLE_STORE_ADMIN") {
        // no store created
        if (!loggedInUser.store) {
          navigate("/create-store");

          return;
        }

        // store pending/blocked
        if (loggedInUser.store.status === "PENDING") {
          navigate("/store-pending");
          return;
        }

        if (loggedInUser.store.status === "BLOCKED") {
          navigate("/store-blocked");
          return;
        }
      }

      navigate(roleRoutes[loggedInUser.role] ?? "/");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleForgotPassword = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = await dispatch(
      forgotPassword({
        email: forgotPasswordEmail,
      })
    );

    if (forgotPassword.fulfilled.match(result)) {
      setForgotStep("OTP");
    }
  };

  const handleVerifyOtp = async () => {
    const result = await dispatch(
      verifyResetOtp({
        email: forgotPasswordEmail,
        otp,
      })
    );

    if (verifyResetOtp.fulfilled.match(result)) {
      setForgotStep("PASSWORD");
    }
  };

  const handleResetPassword = async () => {
    const result = await dispatch(
      resetPassword({
        email: forgotPasswordEmail,
        password: newPassword,
      })
    );

    if (resetPassword.fulfilled.match(result)) {
      setShowForgotPassword(false);

      setForgotStep("EMAIL");

      setOtp("");

      setNewPassword("");

      setShowNewPassword(false);

      setForgotPasswordEmail("");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* LEFT SIDE */}
        <div className="hidden lg:flex flex-col justify-center bg-primary px-16 text-primary-foreground">
          <div className="max-w-xl">
            <div className="mb-10 flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 backdrop-blur">
                <ShoppingCartIcon className="h-8 w-8" />
              </div>

              <div>
                <h1 className="text-4xl font-bold">POS Pro</h1>

                <p className="text-primary-foreground/80">Retail Management Platform</p>
              </div>
            </div>

            <h2 className="mb-6 text-5xl font-bold leading-tight">
              Run your entire retail business from one dashboard.
            </h2>

            <p className="mb-10 text-lg text-primary-foreground/80">
              Manage products, inventory, sales, customers, employees, subscriptions,
              reports and multiple branches with ease.
            </p>

            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-xl bg-white/10 p-5 backdrop-blur">
                <h3 className="text-2xl font-bold">500+</h3>

                <p className="text-sm text-primary-foreground/70">Active Stores</p>
              </div>

              <div className="rounded-xl bg-white/10 p-5 backdrop-blur">
                <h3 className="text-2xl font-bold">10K+</h3>

                <p className="text-sm text-primary-foreground/70">Orders Processed</p>
              </div>

              <div className="rounded-xl bg-white/10 p-5 backdrop-blur">
                <h3 className="text-2xl font-bold">99.9%</h3>

                <p className="text-sm text-primary-foreground/70">Uptime</p>
              </div>

              <div className="rounded-xl bg-white/10 p-5 backdrop-blur">
                <h3 className="text-2xl font-bold">24/7</h3>

                <p className="text-sm text-primary-foreground/70">Support</p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center justify-center px-6 py-10">
          <div className="w-full max-w-md">
            {/* Mobile Logo */}
            <div className="mb-8 text-center lg:hidden">
              <div className="mb-4 flex items-center justify-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary">
                  <ShoppingCartIcon className="h-6 w-6 text-primary-foreground" />
                </div>

                <div className="text-left">
                  <h2 className="text-2xl font-bold">POS Pro</h2>

                  <p className="text-xs text-muted-foreground">
                    Retail Management System
                  </p>
                </div>
              </div>
            </div>

            {/* Home Button */}
            <div className="mb-6">
              <Button
                // variant="ghost"
                onClick={() => navigate("/")}
                className="cursor-pointer"
              >
                <Home className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </div>

            {/* Header */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold">
                {showForgotPassword ? "Reset Password" : "Welcome Back"}
              </h1>

              <p className="mt-2 text-muted-foreground">
                {showForgotPassword
                  ? "Enter your email to receive reset instructions"
                  : "Sign in to continue to your dashboard"}
              </p>
            </div>

            {/* LOGIN FORM */}
            {!showForgotPassword && (
              <div className="rounded-2xl border bg-card p-8 shadow-sm">
                <form className="space-y-5" onSubmit={handleLogin}>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>

                    <Input
                      autoComplete="off"
                      type="email"
                      id="email"
                      name="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>

                    <div className="relative">
                      <Input
                        autoComplete="off"
                        type={showPassword ? "text" : "password"}
                        id="password"
                        name="password"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="pr-10"
                      />

                      <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Checkbox id="remember-me" />

                      <Label htmlFor="remember-me" className="text-sm">
                        Remember me
                      </Label>
                    </div>

                    <Button
                      type="button"
                      variant="link"
                      className="h-auto p-0 cursor-pointer"
                      onClick={() => setShowForgotPassword(true)}
                    >
                      Forgot password?
                    </Button>
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="h-11 w-full cursor-pointer"
                  >
                    {loading ? (
                      <LoadingSpinner size={16} text="Signing In..." />
                    ) : (
                      "Sign In"
                    )}
                  </Button>

                  <div className="text-center text-sm">
                    <span className="text-muted-foreground">Don't have an account?</span>

                    <Button
                      variant="link"
                      className="p-0 ml-1 cursor-pointer"
                      onClick={() => navigate("/signup")}
                    >
                      Create Store
                    </Button>
                  </div>
                </form>
              </div>
            )}

            {/* FORGOT PASSWORD */}
            {showForgotPassword && (
              <div className="rounded-2xl border bg-card p-8 shadow-sm">
                <Button
                  type="button"
                  variant="ghost"
                  className="mb-4 "
                  onClick={() => {
                    setShowForgotPassword(false);

                    setForgotStep("EMAIL");

                    setOtp("");

                    setNewPassword("");
                  }}
                >
                  <ArrowLeftIcon className="mr-2 h-4 w-4" />
                  Back to Login
                </Button>

                {/* EMAIL STEP */}
                {forgotStep === "EMAIL" && (
                  <form className="space-y-5" onSubmit={handleForgotPassword}>
                    <div>
                      <h3 className="text-xl font-semibold">Forgot Password</h3>

                      <p className="mt-1 text-sm text-muted-foreground">
                        Enter your email address and we'll send you an OTP.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="forgot-email">Email Address</Label>

                      <Input
                        autoComplete="off"
                        type="email"
                        id="forgot-email"
                        placeholder="john@example.com"
                        value={forgotPasswordEmail}
                        onChange={(e) => setForgotPasswordEmail(e.target.value)}
                      />
                    </div>

                    <div className="flex gap-3">
                      <Button
                        type="button"
                        variant="outline"
                        className="flex-1 cursor-pointer"
                        onClick={() => setShowForgotPassword(false)}
                      >
                        Cancel
                      </Button>

                      <Button
                        type="submit"
                        className="flex-1 cursor-pointer"
                        disabled={loading}
                      >
                        {loading ? (
                          <LoadingSpinner size={16} text="Sending..." />
                        ) : (
                          "Send OTP"
                        )}
                      </Button>
                    </div>
                  </form>
                )}

                {/* OTP STEP */}
                {forgotStep === "OTP" && (
                  <div className="space-y-5">
                    <div>
                      <h3 className="text-xl font-semibold">Verify OTP</h3>

                      <p className="mt-1 text-sm text-muted-foreground">
                        Enter the OTP sent to {forgotPasswordEmail}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="otp">OTP</Label>

                      <Input
                        id="otp"
                        placeholder="Enter 6 digit OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                      />
                    </div>

                    <div className="flex gap-3">
                      <Button
                        variant="outline"
                        className="flex-1 cursor-pointer"
                        onClick={() => setForgotStep("EMAIL")}
                      >
                        Back
                      </Button>

                      <Button
                        className="flex-1 cursor-pointer"
                        onClick={handleVerifyOtp}
                        disabled={loading}
                      >
                        {loading ? (
                          <LoadingSpinner size={16} text="Verifying..." />
                        ) : (
                          "Verify OTP"
                        )}
                      </Button>
                    </div>
                  </div>
                )}

                {/* PASSWORD STEP */}
                {forgotStep === "PASSWORD" && (
                  <div className="space-y-5">
                    <div>
                      <h3 className="text-xl font-semibold">Create New Password</h3>

                      <p className="mt-1 text-sm text-muted-foreground">
                        Enter your new password below.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="new-password">New Password</Label>

                      <div className="relative">
                        <Input
                          id="new-password"
                          type={showNewPassword ? "text" : "password"}
                          placeholder="Enter new password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          className="pr-10"
                        />

                        <button
                          type="button"
                          onClick={() => setShowNewPassword((prev) => !prev)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-muted-foreground hover:text-foreground"
                        >
                          {showNewPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </div>

                    <Button
                      className="w-full cursor-pointer"
                      onClick={handleResetPassword}
                      disabled={loading}
                    >
                      {loading ? (
                        <LoadingSpinner size={16} text="Resetting..." />
                      ) : (
                        "Reset Password"
                      )}
                    </Button>
                  </div>
                )}
              </div>
            )}

            <div className="mt-8 text-center text-xs text-muted-foreground">
              © {new Date().getFullYear()} POS Pro. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
