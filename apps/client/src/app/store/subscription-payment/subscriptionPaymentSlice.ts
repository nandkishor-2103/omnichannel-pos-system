import { createSlice } from "@reduxjs/toolkit";

import type { SubscriptionPaymentState } from "./subscriptionPaymentTypes";

import {
  createSubscriptionPaymentOrder,
  verifySubscriptionPayment,
  getSubscriptionPaymentHistory,
} from "./subscriptionPaymentThunk";

const initialState: SubscriptionPaymentState = {
  payments: [],

  loading: false,

  creatingOrder: false,

  verifyingPayment: false,

  error: null,
};

const subscriptionPaymentSlice = createSlice({
  name: "subscriptionPayment",

  initialState,

  reducers: {
    clearSubscriptionPaymentError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // ==========================================
      // CREATE PAYMENT ORDER
      // ==========================================

      .addCase(createSubscriptionPaymentOrder.pending, (state) => {
        state.creatingOrder = true;
        state.error = null;
      })

      .addCase(createSubscriptionPaymentOrder.fulfilled, (state) => {
        state.creatingOrder = false;
      })

      .addCase(createSubscriptionPaymentOrder.rejected, (state, action) => {
        state.creatingOrder = false;
        state.error = action.payload ?? "Failed to create payment order";
      })

      // ==========================================
      // VERIFY PAYMENT
      // ==========================================

      .addCase(verifySubscriptionPayment.pending, (state) => {
        state.verifyingPayment = true;
        state.error = null;
      })

      .addCase(verifySubscriptionPayment.fulfilled, (state) => {
        state.verifyingPayment = false;
      })

      .addCase(verifySubscriptionPayment.rejected, (state, action) => {
        state.verifyingPayment = false;
        state.error = action.payload ?? "Failed to verify payment";
      })

      // ==========================================
      // PAYMENT HISTORY
      // ==========================================

      .addCase(getSubscriptionPaymentHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getSubscriptionPaymentHistory.fulfilled, (state, action) => {
        state.loading = false;

        state.payments = action.payload.payload.payments;
      })

      .addCase(getSubscriptionPaymentHistory.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload ?? "Failed to fetch payment history";
      });
  },
});

export const { clearSubscriptionPaymentError } = subscriptionPaymentSlice.actions;

export default subscriptionPaymentSlice.reducer;
