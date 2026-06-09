import { createSlice } from "@reduxjs/toolkit";

import {
  startShift,
  endShift,
  getCurrentShiftProgress,
  getShiftReportByDate,
  getShiftsByCashier,
  getShiftsByBranch,
  getAllShifts,
  getShiftById,
  deleteShift,
  pauseShift,
  resumeShift,
} from "./shiftReportThunk";

import type { ShiftReportState } from "./shiftReportTypes";

const initialState: ShiftReportState = {
  shifts: [],
  currentShift: null,
  selectedShift: null,
  shiftsByCashier: [],
  shiftsByBranch: [],
  loading: false,
  error: null,
};

const shiftReportSlice = createSlice({
  name: "shiftReport",
  initialState,

  reducers: {
    clearShiftReportState: (state) => {
      state.shifts = [];
      state.currentShift = null;
      state.selectedShift = null;
      state.shiftsByCashier = [];
      state.shiftsByBranch = [];
      state.error = null;
    },

    clearCurrentShift: (state) => {
      state.currentShift = null;
    },

    clearSelectedShift: (state) => {
      state.selectedShift = null;
    },

    clearShiftsByCashier: (state) => {
      state.shiftsByCashier = [];
    },

    clearShiftsByBranch: (state) => {
      state.shiftsByBranch = [];
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(startShift.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(startShift.fulfilled, (state, action) => {
        const shift = action.payload.payload.shiftReport;

        state.loading = false;
        state.currentShift = shift;
        state.shifts.unshift(shift);
      })
      .addCase(startShift.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to start shift";
      })

      .addCase(pauseShift.fulfilled, (state, action) => {
        state.currentShift = action.payload.payload.shiftReport;
      })

      .addCase(resumeShift.fulfilled, (state, action) => {
        state.currentShift = action.payload.payload.shiftReport;
      })

      .addCase(endShift.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(endShift.fulfilled, (state, action) => {
        const shift = action.payload.payload.shiftReport;

        state.loading = false;
        state.currentShift = shift;

        const index = state.shifts.findIndex((s) => s.id === shift.id);

        if (index !== -1) {
          state.shifts[index] = shift;
        }
      })
      .addCase(endShift.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to end shift";
      })

      .addCase(getCurrentShiftProgress.fulfilled, (state, action) => {
        state.currentShift = action.payload.payload.shiftReport;
      })

      .addCase(getShiftReportByDate.fulfilled, (state, action) => {
        state.selectedShift = action.payload.payload.shiftReport;
      })

      .addCase(getShiftsByCashier.fulfilled, (state, action) => {
        state.shiftsByCashier = action.payload.payload.shiftReports;
      })

      .addCase(getShiftsByBranch.fulfilled, (state, action) => {
        state.shiftsByBranch = action.payload.payload.shiftReports;
      })

      .addCase(getAllShifts.fulfilled, (state, action) => {
        state.shifts = action.payload.payload.shiftReports;
      })

      .addCase(getShiftById.fulfilled, (state, action) => {
        state.selectedShift = action.payload.payload.shiftReport;
      })

      .addCase(deleteShift.fulfilled, (state, action) => {
        state.shifts = state.shifts.filter((shift) => shift.id !== action.payload);

        state.shiftsByCashier = state.shiftsByCashier.filter(
          (shift) => shift.id !== action.payload
        );

        state.shiftsByBranch = state.shiftsByBranch.filter(
          (shift) => shift.id !== action.payload
        );

        if (state.selectedShift?.id === action.payload) {
          state.selectedShift = null;
        }

        if (state.currentShift?.id === action.payload) {
          state.currentShift = null;
        }
      });
  },
});

export const {
  clearShiftReportState,
  clearCurrentShift,
  clearSelectedShift,
  clearShiftsByCashier,
  clearShiftsByBranch,
} = shiftReportSlice.actions;

export default shiftReportSlice.reducer;
