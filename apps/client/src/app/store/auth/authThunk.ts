import { api, getErrorMessage } from "@/lib/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

import type { SignInResponse, SignUpResponse } from "./authTypes";

// ==================== SignUp Start ====================
type SignUpPayload = {
  name: string;
  email: string;
  password: string;
};

export const signup = createAsyncThunk<
  SignUpResponse,
  SignUpPayload,
  { rejectValue: string }
>("auth/signup", async (userData, { rejectWithValue }) => {
  try {
    const response = await api.post<SignUpResponse>("/auth/signup", userData);

    return response.data;
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
