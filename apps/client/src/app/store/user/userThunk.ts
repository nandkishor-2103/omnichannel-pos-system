import { api } from "@/lib/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { UserProfileResponse } from "../user/userTypes";
import type { User } from "@/types/user";
import { getTestLoadingDelay } from "@/config/appConfig";



// ========== Get User Profile ==========
export const getUserProfile = createAsyncThunk<User, void, { rejectValue: string }>(
  "user/getProfile",
  async (_, { rejectWithValue }) => {
    try {
      // Simulate loading delay
      await getTestLoadingDelay();

      const res = await api.get<UserProfileResponse>("/user/profile");

      //   console.log("User profile success", res.data);

      return res.data.payload.user;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data?.message ?? "Failed to fetch user profile"
        );
      }

      return rejectWithValue("Something went wrong");
    }
  }
);

// ========== Get All Customers ==========
export const getAllCustomers = createAsyncThunk<User[], void, { rejectValue: string }>(
  "user/getCustomers",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get<User[]>("/user/customer");

      console.log("All customers success", res.data);

      return res.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data?.message ?? "Failed to fetch all customers"
        );
      }

      return rejectWithValue("Something went wrong");
    }
  }
);

// ========== Get All Cashiers ==========
export const getAllCashiers = createAsyncThunk<User[], void, { rejectValue: string }>(
  "user/getCashiers",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get<User[]>("/user/cashier");

      console.log("All cashiers success", res.data);

      return res.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data?.message ?? "Failed to fetch all cashiers"
        );
      }

      return rejectWithValue("Something went wrong");
    }
  }
);

// ========== Get User By Id ==========
export const getUserById = createAsyncThunk<User, string, { rejectValue: string }>(
  "user/getById",
  async (userId, { rejectWithValue }) => {
    try {
      const res = await api.get<User>(`/user/${userId}`);

      console.log("User by ID success", res.data);

      return res.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data?.message ?? "Failed to fetch user by ID"
        );
      }

      return rejectWithValue("Something went wrong");
    }
  }
);

// ========== Logout ==========
/* export const logout = createAsyncThunk<void, void, { rejectValue: string }>(
  "user/logout",
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
); */
