import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "@/lib/axios";

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
      `/shift-reports/start?branchId=${branchId}`,
      {}
    );

    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data?.message ?? "Failed to start shift");
    }

    return rejectWithValue("Something went wrong");
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
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data?.message ?? "Failed to end shift");
    }

    return rejectWithValue("Something went wrong");
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
    if (axios.isAxiosError(error)) {
      return rejectWithValue(
        error.response?.data?.message ?? "Failed to fetch current shift"
      );
    }

    return rejectWithValue("Something went wrong");
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
    if (axios.isAxiosError(error)) {
      return rejectWithValue(
        error.response?.data?.message ?? "Failed to fetch shift report"
      );
    }

    return rejectWithValue("Something went wrong");
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
    if (axios.isAxiosError(error)) {
      return rejectWithValue(
        error.response?.data?.message ?? "Failed to fetch cashier shifts"
      );
    }

    return rejectWithValue("Something went wrong");
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
    if (axios.isAxiosError(error)) {
      return rejectWithValue(
        error.response?.data?.message ?? "Failed to fetch branch shifts"
      );
    }

    return rejectWithValue("Something went wrong");
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
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data?.message ?? "Failed to fetch shifts");
    }

    return rejectWithValue("Something went wrong");
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
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data?.message ?? "Shift not found");
    }

    return rejectWithValue("Something went wrong");
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
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message ?? "Failed to delete shift");
      }

      return rejectWithValue("Something went wrong");
    }
  }
);
