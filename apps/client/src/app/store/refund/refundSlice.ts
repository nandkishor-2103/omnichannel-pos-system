import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import {
  createRefund,
  deleteRefund,
  getAllRefunds,
  getRefundById,
  getRefundsByBranch,
  getRefundsByCashier,
  getRefundsByCashierAndDateRange,
  getRefundsByShift,
} from "./refundThunk";

import type { RefundState } from "./refundTypes";

const initialState: RefundState = {
  refunds: [],
  refundsByCashier: [],
  refundsByBranch: [],
  refundsByShift: [],
  refundsByDateRange: [],
  selectedRefund: null,
  loading: false,
  error: null,
};

const refundSlice = createSlice({
  name: "refund",
  initialState,

  reducers: {
    clearRefundState: (state) => {
      state.refunds = [];
      state.refundsByCashier = [];
      state.refundsByBranch = [];
      state.refundsByShift = [];
      state.refundsByDateRange = [];
      state.selectedRefund = null;
      state.error = null;
    },

    clearSelectedRefund: (state) => {
      state.selectedRefund = null;
    },

    clearRefundsByCashier: (state) => {
      state.refundsByCashier = [];
    },

    clearRefundsByBranch: (state) => {
      state.refundsByBranch = [];
    },

    clearRefundsByShift: (state) => {
      state.refundsByShift = [];
    },

    clearRefundsByDateRange: (state) => {
      state.refundsByDateRange = [];
    },
  },

  extraReducers: (builder) => {
    builder

      // ===== CREATE REFUND =====

      .addCase(createRefund.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(createRefund.fulfilled, (state, action) => {
        state.loading = false;

        const refund = action.payload.payload.refund;

        state.refunds.unshift(refund);
        state.refundsByCashier.unshift(refund);
        state.refundsByBranch.unshift(refund);

        if (refund.shiftReportId) {
          state.refundsByShift.unshift(refund);
        }
      })

      .addCase(createRefund.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to create refund";
      })

      // ===== GET ALL REFUNDS =====

      .addCase(getAllRefunds.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getAllRefunds.fulfilled, (state, action) => {
        state.loading = false;
        state.refunds = action.payload.refunds;
      })

      .addCase(getAllRefunds.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to fetch refunds";
      })

      // ===== GET REFUNDS BY CASHIER =====

      .addCase(getRefundsByCashier.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getRefundsByCashier.fulfilled, (state, action) => {
        state.loading = false;
        state.refundsByCashier = action.payload.refunds;
      })

      .addCase(getRefundsByCashier.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to fetch cashier refunds";
      })

      // ===== GET REFUNDS BY BRANCH =====

      .addCase(getRefundsByBranch.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getRefundsByBranch.fulfilled, (state, action) => {
        state.loading = false;
        state.refundsByBranch = action.payload.refunds;
      })

      .addCase(getRefundsByBranch.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to fetch branch refunds";
      })

      // ===== GET REFUNDS BY SHIFT =====

      .addCase(getRefundsByShift.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getRefundsByShift.fulfilled, (state, action) => {
        state.loading = false;
        state.refundsByShift = action.payload.refunds;
      })

      .addCase(getRefundsByShift.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to fetch shift refunds";
      })

      // ===== GET REFUNDS BY DATE RANGE =====

      .addCase(getRefundsByCashierAndDateRange.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getRefundsByCashierAndDateRange.fulfilled, (state, action) => {
        state.loading = false;
        state.refundsByDateRange = action.payload.refunds;
      })

      .addCase(getRefundsByCashierAndDateRange.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to fetch refunds";
      })

      // ===== GET REFUND BY ID =====

      .addCase(getRefundById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getRefundById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedRefund = action.payload.payload.refund;
      })

      .addCase(getRefundById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Refund not found";
      })

      // ===== DELETE REFUND =====

      .addCase(deleteRefund.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(deleteRefund.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;

        state.refunds = state.refunds.filter((refund) => refund.id !== action.payload);

        state.refundsByCashier = state.refundsByCashier.filter(
          (refund) => refund.id !== action.payload
        );

        state.refundsByBranch = state.refundsByBranch.filter(
          (refund) => refund.id !== action.payload
        );

        state.refundsByShift = state.refundsByShift.filter(
          (refund) => refund.id !== action.payload
        );

        state.refundsByDateRange = state.refundsByDateRange.filter(
          (refund) => refund.id !== action.payload
        );

        if (state.selectedRefund && state.selectedRefund.id === action.payload) {
          state.selectedRefund = null;
        }
      })

      .addCase(deleteRefund.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to delete refund";
      });
  },
});

export const {
  clearRefundState,
  clearSelectedRefund,
  clearRefundsByCashier,
  clearRefundsByBranch,
  clearRefundsByShift,
  clearRefundsByDateRange,
} = refundSlice.actions;

export default refundSlice.reducer;
