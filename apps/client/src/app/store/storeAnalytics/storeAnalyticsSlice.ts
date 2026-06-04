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
} from "./storeAnalyticsThunk";

const initialState: StoreAnalyticsState = {
  storeOverview: null,

  salesTrends: null,
  monthlySales: [],
  dailySales: [],

  salesByCategory: [],
  salesByPaymentMethod: [],
  paymentBreakdown: [],

  salesByBranch: [],
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
      state.salesTrends = null;
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
      .addCase(getStoreOverview.fulfilled, (state, action) => {
        state.storeOverview = action.payload;
      })

      .addCase(getSalesTrends.fulfilled, (state, action) => {
        state.salesTrends = action.payload;
      })

      .addCase(getMonthlySales.fulfilled, (state, action) => {
        state.monthlySales = action.payload;
      })

      .addCase(getDailySales.fulfilled, (state, action) => {
        state.dailySales = action.payload;
      })

      .addCase(getSalesByCategory.fulfilled, (state, action) => {
        state.salesByCategory = action.payload;
      })

      .addCase(getSalesByPaymentMethod.fulfilled, (state, action) => {
        state.salesByPaymentMethod = action.payload;
      })

      .addCase(getSalesByBranch.fulfilled, (state, action) => {
        state.salesByBranch = action.payload;
      })

      .addCase(getPaymentBreakdown.fulfilled, (state, action) => {
        state.paymentBreakdown = action.payload;
      })

      .addCase(getBranchPerformance.fulfilled, (state, action) => {
        state.branchPerformance = action.payload;
      })

      .addCase(getStoreAlerts.fulfilled, (state, action) => {
        state.storeAlerts = action.payload;
      });
  },
});

export const { clearStoreAnalyticsState, clearSalesData, clearBranchData } =
  storeAnalyticsSlice.actions;

export default storeAnalyticsSlice.reducer;
