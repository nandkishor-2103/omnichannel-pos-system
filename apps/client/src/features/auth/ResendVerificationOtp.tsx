import { ArrowLeft, MailCheck } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { resendVerificationOtp } from "@/app/store/auth/authThunk";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";

import LoadingSpinner from "@/components/shared/LoadingSpinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ResendVerificationOtp() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const loading = useAppSelector((state) => state.auth.loading);

  const [email, setEmail] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const normalizedEmail = email.trim();

    if (!normalizedEmail) {
      toast.warning("Email is required");
      return;
    }

    if (!emailPattern.test(normalizedEmail)) {
      toast.warning("Invalid email");
      return;
    }

    const result = await dispatch(
      resendVerificationOtp({
        email: normalizedEmail,
      })
    );

    if (resendVerificationOtp.fulfilled.match(result)) {
      localStorage.setItem("verificationEmail", normalizedEmail);
      navigate("/verify-otp");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md rounded-2xl border bg-card p-8 shadow-sm">
        <div className="mb-8 text-center">
          <div className="mb-4 flex justify-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary">
              <MailCheck className="h-7 w-7 text-primary-foreground" />
            </div>
          </div>

          <h1 className="text-3xl font-bold">Request Verification OTP</h1>

          <p className="mt-2 text-sm text-muted-foreground">
            Enter the email address for your unverified account.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="verification-email">Email Address</Label>

            <Input
              id="verification-email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="john@example.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>

          <Button type="submit" disabled={loading} className="w-full cursor-pointer">
            {loading ? <LoadingSpinner size={16} text="Sending..." /> : "Send OTP"}
          </Button>

          <Button
            type="button"
            variant="outline"
            className="w-full cursor-pointer"
            onClick={() => navigate("/login")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Login
          </Button>
        </form>
      </div>
    </div>
  );
}
