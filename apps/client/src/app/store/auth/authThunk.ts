import { api, getErrorMessage } from "@/lib/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

import type { BasicApiResponse, SignInResponse, SignUpResponse } from "./authTypes";

// ==================== SignUp Start ====================
type SignupPayload = {
  fullName: string;
  email: string;
  password: string;
  phone: string;
};

export const signup = createAsyncThunk<
  SignUpResponse,
  SignupPayload,
  { rejectValue: string }
>("auth/signup", async (data, { rejectWithValue }) => {
  try {
    const res = await api.post("/auth/signup", {
      ...data,
      role: "ROLE_STORE_ADMIN",
    });

    return res.data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});
// ==================== SignUp End ====================

// ==================== SignIn Start ====================
type SignInPayload = {
  email: string;
  password: string;
};

export const signin = createAsyncThunk<
  SignInResponse,
  SignInPayload,
  { rejectValue: string }
>("auth/signin", async (loginData, { rejectWithValue }) => {
  try {
    const res = await api.post<SignInResponse>("/auth/signin", loginData);

    return res.data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});
// ==================== SignIn End ====================

// ========== Logout ==========
export const logout = createAsyncThunk<void, void, { rejectValue: string }>(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await api.post("/auth/logout");

      return;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

// ================ FORGOT PASSWORD ==============
type ForgotPasswordPayload = {
  email: string;
};

type ResendVerificationOtpPayload = {
  email: string;
};

export const resendVerificationOtp = createAsyncThunk<
  BasicApiResponse,
  ResendVerificationOtpPayload,
  { rejectValue: string }
>("auth/resendVerificationOtp", async (data, { rejectWithValue }) => {
  try {
    const response = await api.post<BasicApiResponse>(
      "/auth/resend-verification-otp",
      data
    );

    return response.data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

export const forgotPassword = createAsyncThunk<
  BasicApiResponse,
  ForgotPasswordPayload,
  { rejectValue: string }
>("auth/forgotPassword", async (data, { rejectWithValue }) => {
  try {
    const response = await api.post<BasicApiResponse>("/auth/forgot-password", data);

    return response.data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

// =================== VERIFY RESET OTP =================
type VerifyResetOtpPayload = {
  email: string;
  otp: string;
};

export const verifyResetOtp = createAsyncThunk<
  BasicApiResponse,
  VerifyResetOtpPayload,
  { rejectValue: string }
>("auth/verifyResetOtp", async (data, { rejectWithValue }) => {
  try {
    const response = await api.post<BasicApiResponse>("/auth/verify-reset-otp", data);

    return response.data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

// ======================= RESET PASSWORD ================
type ResetPasswordPayload = {
  email: string;
  password: string;
};

export const resetPassword = createAsyncThunk<
  BasicApiResponse,
  ResetPasswordPayload,
  { rejectValue: string }
>("auth/resetPassword", async (data, { rejectWithValue }) => {
  try {
    const response = await api.post<BasicApiResponse>("/auth/reset-password", data);

    return response.data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

// ============== VERIFY OTP =======================
type VerifyOtpPayload = {
  email: string;
  otp: string;
};

export const verifyOtp = createAsyncThunk<
  { message: string },
  VerifyOtpPayload,
  { rejectValue: string }
>("auth/verifyOtp", async (data, { rejectWithValue }) => {
  try {
    const res = await api.post("/auth/verify-otp", data);

    return res.data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

// ============== CHECK SESSION ==============
export const checkSession = createAsyncThunk<boolean, void, { rejectValue: string }>(
  "auth/checkSession",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/auth/session");

      return response.data.payload.authenticated;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);
