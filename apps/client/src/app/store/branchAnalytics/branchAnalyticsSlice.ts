import { createSlice } from "@reduxjs/toolkit";

import {
  getDailySalesChart,
  getTopProductsByQuantity,
  getTopCashiersByRevenue,
  getCategoryWiseSalesBreakdown,
  getTodayOverview,
  getPaymentBreakdown,
} from "./branchAnalyticsThunk";

import type { BranchAnalyticsState } from "./branchAnalyticsTypes";

const initialState: BranchAnalyticsState = {
  dailySales: [],
  topProducts: [],
  topCashiers: [],
  categorySales: [],
  todayOverview: null,
  paymentBreakdown: [],
  loading: false,
  error: null,
};

const branchAnalyticsSlice = createSlice({
  name: "branchAnalytics",

  initialState,

  reducers: {
    clearBranchAnalyticsState: (state) => {
      state.dailySales = [];
      state.topProducts = [];
      state.topCashiers = [];
      state.categorySales = [];
      state.todayOverview = null;
      state.paymentBreakdown = [];
      state.loading = false;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // DAILY SALES

      .addCase(getDailySalesChart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDailySalesChart.fulfilled, (state, action) => {
        state.loading = false;
        state.dailySales = action.payload.payload.sales;
      })
      .addCase(getDailySalesChart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to fetch daily sales";
      })

      // TOP PRODUCTS

      .addCase(getTopProductsByQuantity.fulfilled, (state, action) => {
        state.topProducts = action.payload.payload.products;
      })

      // TOP CASHIERS

      .addCase(getTopCashiersByRevenue.fulfilled, (state, action) => {
        state.topCashiers = action.payload.payload.cashiers;
      })

      // CATEGORY SALES

      .addCase(getCategoryWiseSalesBreakdown.fulfilled, (state, action) => {
        state.categorySales = action.payload.categorySales;
      })

      // TODAY OVERVIEW

      .addCase(getTodayOverview.fulfilled, (state, action) => {
        state.todayOverview = action.payload.payload.overview;
      })

      // PAYMENT BREAKDOWN

      .addCase(getPaymentBreakdown.fulfilled, (state, action) => {
        state.paymentBreakdown = action.payload.payload.payments;
      });
  },
});

export const { clearBranchAnalyticsState } = branchAnalyticsSlice.actions;

export default branchAnalyticsSlice.reducer;
