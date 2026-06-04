import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "@/lib/axios";

import type {
  DailySalesPayload,
  CategorySalesPayload,
  PaymentBreakdownPayload,
  DailySalesResponse,
  TopProductsResponse,
  TopCashiersResponse,
  CategorySalesResponse,
  TodayOverviewResponse,
  PaymentBreakdownResponse,
} from "./branchAnalyticsTypes";

// ================= DAILY SALES =================

export const getDailySalesChart = createAsyncThunk<
  DailySalesResponse,
  DailySalesPayload,
  { rejectValue: string }
>(
  "branchAnalytics/getDailySalesChart",
  async ({ branchId, days = 7 }, { rejectWithValue }) => {
    try {
      const res = await api.get<DailySalesResponse>(
        `/branch-analytics/daily-sales?branchId=${branchId}&days=${days}`
      );

      return res.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data?.message ?? "Failed to fetch daily sales chart"
        );
      }

      return rejectWithValue("Something went wrong");
    }
  }
);

// ================= TOP PRODUCTS =================

export const getTopProductsByQuantity = createAsyncThunk<
  TopProductsResponse,
  string,
  { rejectValue: string }
>("branchAnalytics/getTopProductsByQuantity", async (branchId, { rejectWithValue }) => {
  try {
    const res = await api.get<TopProductsResponse>(
      `/branch-analytics/top-products?branchId=${branchId}`
    );

    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(
        error.response?.data?.message ?? "Failed to fetch top products"
      );
    }

    return rejectWithValue("Something went wrong");
  }
});

// ================= TOP CASHIERS =================

export const getTopCashiersByRevenue = createAsyncThunk<
  TopCashiersResponse,
  string,
  { rejectValue: string }
>("branchAnalytics/getTopCashiersByRevenue", async (branchId, { rejectWithValue }) => {
  try {
    const res = await api.get<TopCashiersResponse>(
      `/branch-analytics/top-cashiers?branchId=${branchId}`
    );

    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(
        error.response?.data?.message ?? "Failed to fetch top cashiers"
      );
    }

    return rejectWithValue("Something went wrong");
  }
});

// ================= CATEGORY SALES =================

export const getCategoryWiseSalesBreakdown = createAsyncThunk<
  CategorySalesResponse,
  CategorySalesPayload,
  { rejectValue: string }
>(
  "branchAnalytics/getCategoryWiseSalesBreakdown",
  async ({ branchId, date }, { rejectWithValue }) => {
    try {
      const res = await api.get<CategorySalesResponse>(
        `/branch-analytics/category-sales?branchId=${branchId}&date=${date}`
      );

      return res.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data?.message ?? "Failed to fetch category-wise sales breakdown"
        );
      }

      return rejectWithValue("Something went wrong");
    }
  }
);

// ================= TODAY OVERVIEW =================

export const getTodayOverview = createAsyncThunk<
  TodayOverviewResponse,
  string,
  { rejectValue: string }
>("branchAnalytics/getTodayOverview", async (branchId, { rejectWithValue }) => {
  try {
    const res = await api.get<TodayOverviewResponse>(
      `/branch-analytics/today-overview?branchId=${branchId}`
    );

    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(
        error.response?.data?.message ?? "Failed to fetch today overview"
      );
    }

    return rejectWithValue("Something went wrong");
  }
});

// ================= PAYMENT BREAKDOWN =================

export const getPaymentBreakdown = createAsyncThunk<
  PaymentBreakdownResponse,
  PaymentBreakdownPayload,
  { rejectValue: string }
>(
  "branchAnalytics/getPaymentBreakdown",
  async ({ branchId, date }, { rejectWithValue }) => {
    try {
      const res = await api.get<PaymentBreakdownResponse>(
        `/branch-analytics/payment-breakdown?branchId=${branchId}&date=${date}`
      );

      return res.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data?.message ?? "Failed to fetch payment breakdown"
        );
      }

      return rejectWithValue("Something went wrong");
    }
  }
);
