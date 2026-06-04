import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "@/lib/axios";

import type {
  SubscriptionPlanResponse,
  SubscriptionPlansResponse,
  CreateSubscriptionPlanPayload,
  UpdateSubscriptionPlanPayload,
} from "./subscriptionPlanTypes";

// ================= CREATE SUBSCRIPTION PLAN =================

export const createSubscriptionPlan = createAsyncThunk<
  SubscriptionPlanResponse,
  CreateSubscriptionPlanPayload,
  { rejectValue: string }
>("subscriptionPlan/create", async (plan, { rejectWithValue }) => {
  try {
    const res = await api.post<SubscriptionPlanResponse>(
      "/super-admin/subscription-plans",
      plan
    );

    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(
        error.response?.data?.message ?? "Failed to create subscription plan"
      );
    }

    return rejectWithValue("Something went wrong");
  }
});

// ================= UPDATE SUBSCRIPTION PLAN =================

export const updateSubscriptionPlan = createAsyncThunk<
  SubscriptionPlanResponse,
  UpdateSubscriptionPlanPayload,
  { rejectValue: string }
>("subscriptionPlan/update", async ({ id, plan }, { rejectWithValue }) => {
  try {
    const res = await api.put<SubscriptionPlanResponse>(
      `/super-admin/subscription-plans/${id}`,
      plan
    );

    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(
        error.response?.data?.message ?? "Failed to update subscription plan"
      );
    }

    return rejectWithValue("Something went wrong");
  }
});

// ================= GET ALL SUBSCRIPTION PLANS =================

export const getAllSubscriptionPlans = createAsyncThunk<
  SubscriptionPlansResponse,
  void,
  { rejectValue: string }
>("subscriptionPlan/getAll", async (_, { rejectWithValue }) => {
  try {
    const res = await api.get<SubscriptionPlansResponse>(
      "/super-admin/subscription-plans"
    );

    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(
        error.response?.data?.message ?? "Failed to fetch subscription plans"
      );
    }

    return rejectWithValue("Something went wrong");
  }
});

// ================= GET SUBSCRIPTION PLAN BY ID  =================

export const getSubscriptionPlanById = createAsyncThunk<
  SubscriptionPlanResponse,
  string,
  { rejectValue: string }
>("subscriptionPlan/getById", async (id, { rejectWithValue }) => {
  try {
    const res = await api.get<SubscriptionPlanResponse>(
      `/super-admin/subscription-plans/${id}`
    );

    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(
        error.response?.data?.message ?? "Failed to fetch subscription plan"
      );
    }

    return rejectWithValue("Something went wrong");
  }
});

// ================= DELETE SUBSCRIPTION PLAN =================

export const deleteSubscriptionPlan = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("subscriptionPlan/delete", async (id, { rejectWithValue }) => {
  try {
    await api.delete(`/super-admin/subscription-plans/${id}`);

    return id;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(
        error.response?.data?.message ?? "Failed to delete subscription plan"
      );
    }

    return rejectWithValue("Something went wrong");
  }
});
