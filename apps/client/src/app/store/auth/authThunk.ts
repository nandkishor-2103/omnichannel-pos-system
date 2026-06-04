import { api } from "@/lib/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import type { SignInResponse, SignUpResponse } from "./authTypes";
import { getTestLoadingDelay } from "@/config/appConfig";

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
    // Simulate loading delay
    await getTestLoadingDelay();

    const res = await api.post<SignUpResponse>("/auth/signup", userData);

    console.log("SignUp success", res.data);

    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data?.message ?? "SignUp failed");
    }

    return rejectWithValue("Something went wrong");
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
    // Simulate loading delay
    await getTestLoadingDelay();

    const res = await api.post<SignInResponse>("/auth/signin", loginData);

    // console.log("SignIn success", res.data);

    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data?.message ?? "SignIn failed");
    }

    return rejectWithValue("Something went wrong");
  }
});
// ==================== SignIn End ====================

// ========== Logout ==========
export const logout = createAsyncThunk<void, void, { rejectValue: string }>(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await api.post("/auth/logout");

      console.log("Logout success");

      return;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message ?? "Failed to logout");
      }

      return rejectWithValue("Something went wrong");
    }
  }
);
