import { createSlice } from "@reduxjs/toolkit";

import type { OrderPaymentState } from "./orderPaymentTypes";

import { createOrderPaymentOrder, verifyOrderPayment } from "./orderPaymentThunk";

const initialState: OrderPaymentState = {
  creatingOrder: false,

  verifyingPayment: false,

  error: null,
};

const orderPaymentSlice = createSlice({
  name: "orderPayment",

  initialState,

  reducers: {
    clearOrderPaymentError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(createOrderPaymentOrder.pending, (state) => {
        state.creatingOrder = true;
      })

      .addCase(createOrderPaymentOrder.fulfilled, (state) => {
        state.creatingOrder = false;
      })

      .addCase(createOrderPaymentOrder.rejected, (state, action) => {
        state.creatingOrder = false;

        state.error = action.payload ?? "Failed to create payment order";
      })

      .addCase(verifyOrderPayment.pending, (state) => {
        state.verifyingPayment = true;
      })

      .addCase(verifyOrderPayment.fulfilled, (state) => {
        state.verifyingPayment = false;
      })

      .addCase(verifyOrderPayment.rejected, (state, action) => {
        state.verifyingPayment = false;

        state.error = action.payload ?? "Failed to verify payment";
      });
  },
});

export const { clearOrderPaymentError } = orderPaymentSlice.actions;

export default orderPaymentSlice.reducer;
