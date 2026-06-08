import { api, getErrorMessage } from "@/lib/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { UserProfileResponse } from "../user/userTypes";
import type { User } from "@/types/user";

// ========== Get User Profile ==========
export const getUserProfile = createAsyncThunk<User, void, { rejectValue: string }>(
  "user/getProfile",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get<UserProfileResponse>("/user/profile");

      return res.data.payload.user;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

// ========== Get All Customers ==========
export const getAllCustomers = createAsyncThunk<User[], void, { rejectValue: string }>(
  "user/getCustomers",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get<User[]>("/user/customer");

      return res.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

// ========== Get All Cashiers ==========
export const getAllCashiers = createAsyncThunk<User[], void, { rejectValue: string }>(
  "user/getCashiers",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get<User[]>("/user/cashier");

      return res.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

// ========== Get User By Id ==========
export const getUserById = createAsyncThunk<User, string, { rejectValue: string }>(
  "user/getById",
  async (userId, { rejectWithValue }) => {
    try {
      const res = await api.get<User>(`/user/${userId}`);

      return res.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

// ========== Logout ==========
/* export const logout = createAsyncThunk<void, void, { rejectValue: string }>(
  "user/logout",
  async (_, { rejectWithValue }) => {
    try {
      await api.post("/auth/logout");

      return;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
); */
