import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { api, getErrorMessage } from "@/lib/axios";

import type {
  StoreOverviewResponse,
  SalesTrend,
  MonthlySales,
  DailySales,
  CategorySale,
  PaymentMethodSale,
  BranchSale,
  PaymentBreakdown,
  BranchPerformance,
  StoreAlert,
  SalesTrendsPayload,
  TodaySalesByBranchResponse,
  TodaySalesByBranch,
  SalesTrendsResponse,
} from "./storeAnalyticsTypes";

// ================= STORE OVERVIEW =================

export const getStoreOverview = createAsyncThunk<
  StoreOverviewResponse,
  string,
  { rejectValue: string }
>("storeAnalytics/getStoreOverview", async (storeAdminId, { rejectWithValue }) => {
  try {
    const res = await api.get<StoreOverviewResponse>(
      `/store/analytics/${storeAdminId}/overview`
    );

    return res.data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

// ================= SALES TRENDS =================

export const getSalesTrends = createAsyncThunk<
  SalesTrendsResponse,
  SalesTrendsPayload,
  { rejectValue: string }
>("storeAnalytics/getSalesTrends", async ({ storeId, period }, { rejectWithValue }) => {
  try {
    const res = await api.get<SalesTrendsResponse>(
      `/store/analytics/${storeId}/sales-trends?period=${period}`
    );

    return res.data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

// ================= MONTHLY SALES =================

export const getMonthlySales = createAsyncThunk<
  MonthlySales[],
  string,
  { rejectValue: string }
>("storeAnalytics/getMonthlySales", async (storeAdminId, { rejectWithValue }) => {
  try {
    const res = await api.get<MonthlySales[]>(
      `/store/analytics/${storeAdminId}/sales/monthly`
    );

    return res.data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

// ================= DAILY SALES =================

export const getDailySales = createAsyncThunk<
  DailySales[],
  string,
  { rejectValue: string }
>("storeAnalytics/getDailySales", async (storeAdminId, { rejectWithValue }) => {
  try {
    const res = await api.get<DailySales[]>(
      `/store/analytics/${storeAdminId}/sales/daily`
    );

    return res.data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

// ================= SALES BY CATEGORY =================

export const getSalesByCategory = createAsyncThunk<
  CategorySale[],
  string,
  { rejectValue: string }
>("storeAnalytics/getSalesByCategory", async (storeAdminId, { rejectWithValue }) => {
  try {
    const res = await api.get<CategorySale[]>(
      `/store/analytics/${storeAdminId}/sales/category`
    );

    return res.data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

// ================= SALES BY PAYMENT METHOD =================

export const getSalesByPaymentMethod = createAsyncThunk<
  PaymentMethodSale[],
  string,
  { rejectValue: string }
>("storeAnalytics/getSalesByPaymentMethod", async (storeAdminId, { rejectWithValue }) => {
  try {
    const res = await api.get<PaymentMethodSale[]>(
      `/store/analytics/${storeAdminId}/sales/payment-method`
    );

    return res.data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

// ================= SALES BY BRANCH =================

export const getSalesByBranch = createAsyncThunk<
  BranchSale[],
  string,
  { rejectValue: string }
>("storeAnalytics/getSalesByBranch", async (storeAdminId, { rejectWithValue }) => {
  try {
    const res = await api.get<BranchSale[]>(
      `/api/store/analytics/${storeAdminId}/sales/branch`
    );

    return res.data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

// ================= PAYMENT BREAKDOWN =================

export const getPaymentBreakdown = createAsyncThunk<
  PaymentBreakdown[],
  string,
  { rejectValue: string }
>("storeAnalytics/getPaymentBreakdown", async (storeAdminId, { rejectWithValue }) => {
  try {
    const res = await api.get<PaymentBreakdown[]>(
      `/api/store/analytics/${storeAdminId}/payments`
    );

    return res.data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

// ================= BRANCH PERFORMANCE =================

export const getBranchPerformance = createAsyncThunk<
  BranchPerformance[],
  string,
  { rejectValue: string }
>("storeAnalytics/getBranchPerformance", async (storeAdminId, { rejectWithValue }) => {
  try {
    const res = await api.get<BranchPerformance[]>(
      `/store/analytics/${storeAdminId}/branch-performance`
    );

    return res.data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

// ================= STORE ALERTS =================

export const getStoreAlerts = createAsyncThunk<
  StoreAlert[],
  string,
  { rejectValue: string }
>("storeAnalytics/getStoreAlerts", async (storeAdminId, { rejectWithValue }) => {
  try {
    const res = await api.get<StoreAlert[]>(`/store/analytics/${storeAdminId}/alerts`);

    return res.data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

export const getTodaySalesByBranch = createAsyncThunk<
  TodaySalesByBranch[],
  string,
  { rejectValue: string }
>("storeAnalytics/getTodaySalesByBranch", async (storeId, { rejectWithValue }) => {
  try {
    const res = await api.get<TodaySalesByBranchResponse>(
      `/store/analytics/${storeId}/today-sales-by-branch`
    );

    return res.data.payload.sales;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});
