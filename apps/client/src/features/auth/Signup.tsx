import { Eye, EyeOff, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { signup } from "@/app/store/auth/authThunk";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import LoadingSpinner from "@/components/shared/LoadingSpinner";

import { toast } from "sonner";

export default function Signup() {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const loading = useAppSelector((state) => state.auth.loading);

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = await dispatch(signup(formData));

    if (signup.fulfilled.match(result)) {
      localStorage.setItem("verificationEmail", formData.email);

      //   toast.success("Account created successfully");

      navigate("/verify-otp");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-lg rounded-2xl border bg-card p-8 shadow-sm">
        <div className="mb-8 text-center">
          <div className="mb-4 flex justify-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary">
              <ShoppingCart className="h-7 w-7 text-primary-foreground" />
            </div>
          </div>

          <h1 className="text-3xl font-bold">Create Account</h1>

          <p className="mt-2 text-muted-foreground">Start your POS Pro journey today</p>
        </div>

        <form onSubmit={handleSignup} className="space-y-5">
          <div className="space-y-2">
            <Label>Full Name</Label>

            <Input
              autoComplete="name"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Email</Label>

            <Input
              autoComplete="new-email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Phone</Label>

            <Input
              name="phone"
              autoComplete="tel"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Password</Label>

            <div className="relative">
              <Input
                autoComplete="new-password"
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="pr-10"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <Button type="submit" disabled={loading} className="w-full cursor-pointer">
            {loading ? (
              <LoadingSpinner size={16} text="Creating Account..." />
            ) : (
              "Create Account"
            )}
          </Button>

          <div className="text-center text-sm">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="font-medium text-primary cursor-pointer underline"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
