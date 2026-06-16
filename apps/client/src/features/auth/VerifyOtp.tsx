import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { MailCheck } from "lucide-react";
import { toast } from "sonner";

import { verifyOtp } from "@/app/store/auth/authThunk";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import LoadingSpinner from "@/components/shared/LoadingSpinner";

export default function VerifyOtp() {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const loading = useAppSelector((state) => state.auth.loading);

  const [email] = useState(() => localStorage.getItem("verificationEmail") ?? "");

  const [otp, setOtp] = useState("");

  if (!email) {
    return <Navigate to="/signup" replace />;
  }

  const handleVerify = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = await dispatch(
      verifyOtp({
        email,
        otp,
      })
    );

    if (verifyOtp.fulfilled.match(result)) {
      localStorage.removeItem("verificationEmail");

      navigate("/login", {
        replace: true,
      });
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

          <h1 className="text-3xl font-bold">Verify Your Email</h1>

          <p className="mt-2 text-sm text-muted-foreground">
            We've sent a verification code to
          </p>

          <p className="mt-1 break-all font-medium">{email}</p>
        </div>

        <form onSubmit={handleVerify} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="otp">Verification Code</Label>

            <Input
              id="otp"
              placeholder="Enter 6 digit OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              maxLength={6}
              required
            />
          </div>

          <Button type="submit" disabled={loading} className="w-full cursor-pointer">
            {loading ? <LoadingSpinner size={16} text="Verifying..." /> : "Verify Email"}
          </Button>

          <Button
            type="button"
            variant="outline"
            className="w-full cursor-pointer"
            onClick={() => {
              localStorage.removeItem("verificationEmail");
              navigate("/signup");
            }}
          >
            Back to Signup
          </Button>
        </form>
      </div>
    </div>
  );
}
