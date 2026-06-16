import { ArrowLeftIcon, ShoppingCartIcon, Eye, EyeOff } from "lucide-react";
import { useEffect, useState } from "react";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";

import { signin } from "@/app/store/auth/authThunk";

import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { useNavigate } from "react-router-dom";
import type { UserRole } from "./types/types";
import LoadingSpinner from "@/components/shared/LoadingSpinner";

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

  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const user = useAppSelector((state) => state.auth.user);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const loading = useAppSelector((state) => state.auth.loading);

  useEffect(() => {
    if (!user) return;

    navigate(roleRoutes[user.role] ?? "/", {
      replace: true,
    });
  }, [user, navigate]);

  const handleLogin = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const resultAction = await dispatch(signin(formData));
    if (signin.fulfilled.match(resultAction)) {
      const loggedInUser = resultAction.payload.payload.user;

      navigate(roleRoutes[loggedInUser.role] ?? "/");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleForgotPassword = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("Forgot Password Form Submitted...\n");
    console.log(forgotPasswordEmail);

    setShowForgotPassword(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-primary/10 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mb-5 flex items-center justify-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary">
              <ShoppingCartIcon className="h-6 w-6 text-primary-foreground" />
            </div>

            <div className="text-left">
              <h2 className="text-xl font-bold">POS Pro</h2>

              <p className="text-xs text-muted-foreground">Retail Management System</p>
            </div>
          </div>

          <h1 className="text-3xl font-bold">
            {showForgotPassword ? "Reset Password" : "Welcome Back"}
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">
            {showForgotPassword
              ? "Enter your email to receive reset instructions"
              : "Sign in to continue to your dashboard"}
          </p>
        </div>

        {/* Login Form */}
        {!showForgotPassword && (
          <div className="rounded-2xl border bg-card p-8 shadow-sm">
            <form className="space-y-5" onSubmit={handleLogin}>
              {/* Email */}
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

              {/* Password */}
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
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember Me + Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="remember-me"
                    name="remember-me"
                    className="cursor-pointer"
                  />

                  <Label htmlFor="remember-me" className="cursor-pointer text-sm">
                    Remember me
                  </Label>
                </div>

                <Button
                  type="button"
                  variant="link"
                  className="h-auto cursor-pointer p-0"
                  onClick={() => setShowForgotPassword(true)}
                >
                  Forgot password?
                </Button>
              </div>

              {/* Login Button */}
              <Button
                type="submit"
                disabled={loading}
                className="h-11 w-full cursor-pointer font-medium disabled:opacity-100 disabled:cursor-not-allowed"
              >
                {loading ? <LoadingSpinner size={16} text="Signing In..." /> : "Sign In"}
              </Button>
            </form>
          </div>
        )}

        {/* Forgot Password Form */}
        {showForgotPassword && (
          <div className="rounded-2xl border bg-card p-8 shadow-sm">
            <Button
              type="button"
              variant="ghost"
              className="mb-4 cursor-pointer px-2"
              onClick={() => setShowForgotPassword(false)}
            >
              <ArrowLeftIcon /> Back to Login
            </Button>

            <form className="space-y-5" onSubmit={handleForgotPassword}>
              <div className="space-y-2">
                <Label htmlFor="forgot-email">Email Address</Label>

                <Input
                  autoComplete="off"
                  type="email"
                  id="forgot-email"
                  name="forgotPasswordEmail"
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

                <Button type="submit" className="flex-1 cursor-pointer">
                  Send Reset Link
                </Button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
