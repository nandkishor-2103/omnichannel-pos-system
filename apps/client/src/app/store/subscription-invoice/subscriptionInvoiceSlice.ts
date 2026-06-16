import { createSlice } from "@reduxjs/toolkit";

import type { SubscriptionInvoiceState } from "./subscriptionInvoiceTypes";

import {
  getSubscriptionInvoices,
  getSubscriptionInvoiceById,
  resendSubscriptionInvoice,
} from "./subscriptionInvoiceThunk";

const initialState: SubscriptionInvoiceState = {
  invoices: [],
  selectedInvoice: null,
  loading: false,
  error: null,
};

const subscriptionInvoiceSlice = createSlice({
  name: "subscriptionInvoice",

  initialState,

  reducers: {
    clearSubscriptionInvoiceError: (state) => {
      state.error = null;
    },

    clearSelectedInvoice: (state) => {
      state.selectedInvoice = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // ==========================================
      // GET ALL INVOICES
      // ==========================================

      .addCase(getSubscriptionInvoices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getSubscriptionInvoices.fulfilled, (state, action) => {
        state.loading = false;

        state.invoices = action.payload.payload.invoices;
      })

      .addCase(getSubscriptionInvoices.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload ?? "Failed to fetch invoices";
      })

      // ==========================================
      // GET INVOICE BY ID
      // ==========================================

      .addCase(getSubscriptionInvoiceById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getSubscriptionInvoiceById.fulfilled, (state, action) => {
        state.loading = false;

        state.selectedInvoice = action.payload.payload.invoice;
      })

      .addCase(getSubscriptionInvoiceById.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload ?? "Failed to fetch invoice";
      })

      // ==========================================
      // RESEND INVOICE
      // ==========================================

      .addCase(resendSubscriptionInvoice.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(resendSubscriptionInvoice.fulfilled, (state, action) => {
        state.loading = false;

        const updatedInvoice = action.payload.payload.invoice;

        const index = state.invoices.findIndex(
          (invoice) => invoice._id === updatedInvoice._id
        );

        if (index !== -1) {
          state.invoices[index] = updatedInvoice;
        }

        if (state.selectedInvoice && state.selectedInvoice._id === updatedInvoice._id) {
          state.selectedInvoice = updatedInvoice;
        }
      })

      .addCase(resendSubscriptionInvoice.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload ?? "Failed to resend invoice";
      });
  },
});

export const { clearSubscriptionInvoiceError, clearSelectedInvoice } =
  subscriptionInvoiceSlice.actions;

export default subscriptionInvoiceSlice.reducer;
