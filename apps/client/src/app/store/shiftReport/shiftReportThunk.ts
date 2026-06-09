import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { api, getErrorMessage } from "@/lib/axios";

import type {
  ShiftReportResponse,
  ShiftReportsResponse,
  ShiftReportByDatePayload,
} from "./shiftReportTypes";

// ================= START SHIFT =================

export const startShift = createAsyncThunk<
  ShiftReportResponse,
  string,
  { rejectValue: string }
>("shiftReport/start", async (branchId, { rejectWithValue }) => {
  try {
    const res = await api.post<ShiftReportResponse>(
      `/shift-reports/start?branchId=${branchId}`
    );

    return res.data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

// =================== PAUSE SHIFT =====================
export const pauseShift = createAsyncThunk<
  ShiftReportResponse,
  void,
  { rejectValue: string }
>("shiftReport/pause", async (_, { rejectWithValue }) => {
  try {
    const res = await api.patch<ShiftReportResponse>("/shift-reports/pause");

    return res.data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

// ======================== RESUME SHIFT ==================

export const resumeShift = createAsyncThunk<
  ShiftReportResponse,
  void,
  { rejectValue: string }
>("shiftReport/resume", async (_, { rejectWithValue }) => {
  try {
    const res = await api.patch<ShiftReportResponse>("/shift-reports/resume");

    return res.data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

// ================= END SHIFT =================

export const endShift = createAsyncThunk<
  ShiftReportResponse,
  void,
  { rejectValue: string }
>("shiftReport/end", async (_, { rejectWithValue }) => {
  try {
    const res = await api.patch<ShiftReportResponse>("/shift-reports/end", {});

    return res.data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

// ================= CURRENT SHIFT =================

export const getCurrentShiftProgress = createAsyncThunk<
  ShiftReportResponse,
  void,
  { rejectValue: string }
>("shiftReport/getCurrent", async (_, { rejectWithValue }) => {
  try {
    const res = await api.get<ShiftReportResponse>("/shift-reports/current");

    return res.data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

// ================= SHIFT BY DATE =================

export const getShiftReportByDate = createAsyncThunk<
  ShiftReportResponse,
  ShiftReportByDatePayload,
  { rejectValue: string }
>("shiftReport/getByDate", async (payload, { rejectWithValue }) => {
  try {
    const res = await api.get<ShiftReportResponse>(
      `/shift-reports/cashier/${payload.cashierId}/by-date?date=${encodeURIComponent(payload.date)}`
    );

    return res.data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

// ================= SHIFTS BY CASHIER =================

export const getShiftsByCashier = createAsyncThunk<
  ShiftReportsResponse,
  string,
  { rejectValue: string }
>("shiftReport/getByCashier", async (cashierId, { rejectWithValue }) => {
  try {
    const res = await api.get<ShiftReportsResponse>(
      `/shift-reports/cashier/${cashierId}`
    );

    return res.data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

// ================= SHIFTS BY BRANCH =================

export const getShiftsByBranch = createAsyncThunk<
  ShiftReportsResponse,
  string,
  { rejectValue: string }
>("shiftReport/getByBranch", async (branchId, { rejectWithValue }) => {
  try {
    const res = await api.get<ShiftReportsResponse>(`/shift-reports/branch/${branchId}`);

    return res.data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

// ================= GET ALL SHIFTS =================

export const getAllShifts = createAsyncThunk<
  ShiftReportsResponse,
  void,
  { rejectValue: string }
>("shiftReport/getAll", async (_, { rejectWithValue }) => {
  try {
    const res = await api.get<ShiftReportsResponse>("/shift-reports");

    return res.data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

// ================= GET SHIFT BY ID =================

export const getShiftById = createAsyncThunk<
  ShiftReportResponse,
  string,
  { rejectValue: string }
>("shiftReport/getById", async (id, { rejectWithValue }) => {
  try {
    const res = await api.get<ShiftReportResponse>(`/shift-reports/${id}`);

    return res.data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

// ================= DELETE SHIFT =================

export const deleteShift = createAsyncThunk<string, string, { rejectValue: string }>(
  "shiftReport/delete",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/shift-reports/${id}`);

      return id;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);
