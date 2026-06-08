import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { api, getErrorMessage } from "@/lib/axios";

import type {
  CreateRefundPayload,
  RefundDateRangePayload,
  RefundResponse,
  RefundsResponse,
} from "./refundTypes";

// ================= CREATE REFUND =================

export const createRefund = createAsyncThunk<
  RefundResponse,
  CreateRefundPayload,
  { rejectValue: string }
>("refund/create", async (refundDTO, { rejectWithValue }) => {
  try {
    const res = await api.post<RefundResponse>("/refunds", refundDTO);

    return res.data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

// ================= GET ALL REFUNDS =================

export const getAllRefunds = createAsyncThunk<
  RefundsResponse,
  void,
  { rejectValue: string }
>("refund/getAll", async (_, { rejectWithValue }) => {
  try {
    const res = await api.get<RefundsResponse>("/refunds");

    return res.data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

// ================= GET REFUNDS BY CASHIER =================

export const getRefundsByCashier = createAsyncThunk<
  RefundsResponse,
  string,
  { rejectValue: string }
>("refund/getByCashier", async (cashierId, { rejectWithValue }) => {
  try {
    const res = await api.get<RefundsResponse>(`/refunds/cashier/${cashierId}`);

    return res.data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

// ================= GET REFUNDS BY BRANCH =================

export const getRefundsByBranch = createAsyncThunk<
  RefundsResponse,
  string,
  { rejectValue: string }
>("refund/getByBranch", async (branchId, { rejectWithValue }) => {
  try {
    const res = await api.get<RefundsResponse>(`/refunds/branch/${branchId}`);

    return res.data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

// ================= GET REFUNDS BY SHIFT =================

export const getRefundsByShift = createAsyncThunk<
  RefundsResponse,
  string,
  { rejectValue: string }
>("refund/getByShift", async (shiftReportId, { rejectWithValue }) => {
  try {
    const res = await api.get<RefundsResponse>(`/refunds/shift/${shiftReportId}`);

    return res.data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

// ================= GET REFUNDS BY CASHIER & DATE RANGE =================

export const getRefundsByCashierAndDateRange = createAsyncThunk<
  RefundsResponse,
  RefundDateRangePayload,
  { rejectValue: string }
>(
  "refund/getByCashierAndDateRange",
  async ({ cashierId, from, to }, { rejectWithValue }) => {
    try {
      const res = await api.get<RefundsResponse>(`/refunds/cashier/${cashierId}/range`, {
        params: {
          from,
          to,
        },
      });

      return res.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

// ================= GET REFUND BY ID =================

export const getRefundById = createAsyncThunk<
  RefundResponse,
  string,
  { rejectValue: string }
>("refund/getById", async (id, { rejectWithValue }) => {
  try {
    const res = await api.get<RefundResponse>(`/refunds/${id}`);

    return res.data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

// ================= DELETE REFUND =================

export const deleteRefund = createAsyncThunk<string, string, { rejectValue: string }>(
  "refund/delete",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/refunds/${id}`);

      return id;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);
