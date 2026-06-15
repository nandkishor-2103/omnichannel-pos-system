import { createSlice } from "@reduxjs/toolkit";

import type { StoreAnalyticsState } from "./storeAnalyticsTypes";

import {
  getStoreOverview,
  getSalesTrends,
  getMonthlySales,
  getDailySales,
  getSalesByCategory,
  getSalesByPaymentMethod,
  getSalesByBranch,
  getPaymentBreakdown,
  getBranchPerformance,
  getStoreAlerts,
  getTodaySalesByBranch,
} from "./storeAnalyticsThunk";

const initialState: StoreAnalyticsState = {
  storeOverview: null,

  salesTrends: [],
  monthlySales: [],
  dailySales: [],

  salesByCategory: [],
  salesByPaymentMethod: [],
  paymentBreakdown: [],

  salesByBranch: [],
  todaySalesByBranch: [],

  branchPerformance: null,
  storeAlerts: null,

  loading: false,
  error: null,
};

const storeAnalyticsSlice = createSlice({
  name: "storeAnalytics",

  initialState,

  reducers: {
    clearStoreAnalyticsState: (state) => {
      Object.assign(state, initialState);
    },

    clearSalesData: (state) => {
      state.salesTrends = [];
      state.monthlySales = [];
      state.dailySales = [];
      state.salesByCategory = [];
      state.salesByPaymentMethod = [];
      state.salesByBranch = [];
    },

    clearBranchData: (state) => {
      state.salesByBranch = [];
      state.branchPerformance = null;
    },
  },

  extraReducers: (builder) => {
    builder
      // STORE OVERVIEW
      .addCase(getStoreOverview.fulfilled, (state, action) => {
        state.storeOverview = action.payload.payload.overview;
      })

      // SALES TRENDS
      .addCase(getSalesTrends.fulfilled, (state, action) => {
        state.salesTrends = action.payload.payload.trends.points;

        state.dailySales = action.payload.payload.trends.points.map((point) => ({
          date: point.date,
          sales: point.totalAmount,
          branchName: point.branchName,
        }));
      })

      // MONTHLY SALES
      .addCase(getMonthlySales.fulfilled, (state, action) => {
        state.monthlySales = action.payload.payload.monthlySales;
      })

      // DAILY SALES
      .addCase(getDailySales.fulfilled, (state, action) => {
        state.dailySales = action.payload.map((item) => ({
          date: item.date,
          sales: item.totalAmount,
          branchName: item.branchName,
        }));
      })

      // CATEGORY SALES
      .addCase(getSalesByCategory.fulfilled, (state, action) => {
        state.salesByCategory = action.payload.payload.categorySales.map((item) => ({
          category: item.categoryName,
          amount: item.totalSales,
        }));
      })

      // PAYMENT METHOD SALES
      .addCase(getSalesByPaymentMethod.fulfilled, (state, action) => {
        state.salesByPaymentMethod = action.payload;
      })

      // SALES BY BRANCH
      .addCase(getSalesByBranch.fulfilled, (state, action) => {
        state.salesByBranch = action.payload;
      })

      // PAYMENT BREAKDOWN
      .addCase(getPaymentBreakdown.fulfilled, (state, action) => {
        state.paymentBreakdown = action.payload;
      })

      // BRANCH PERFORMANCE
      .addCase(getBranchPerformance.fulfilled, (state, action) => {
        state.branchPerformance = action.payload;
      })

      // STORE ALERTS
      .addCase(getStoreAlerts.fulfilled, (state, action) => {
        state.storeAlerts = action.payload;
      })

      // TODAY SALES BY BRANCH
      .addCase(getTodaySalesByBranch.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getTodaySalesByBranch.fulfilled, (state, action) => {
        state.loading = false;
        state.todaySalesByBranch = action.payload;
      })

      .addCase(getTodaySalesByBranch.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to fetch today's branch sales";
      });
  },
});

export const { clearStoreAnalyticsState, clearSalesData, clearBranchData } =
  storeAnalyticsSlice.actions;

export default storeAnalyticsSlice.reducer;
