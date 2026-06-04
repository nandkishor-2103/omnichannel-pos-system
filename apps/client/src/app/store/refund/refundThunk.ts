import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "@/lib/axios";

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

    console.log("✅ Refund created:", res.data);

    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("❌ Create refund failed:", error.response?.data);

      return rejectWithValue(error.response?.data?.message ?? "Failed to create refund");
    }

    return rejectWithValue("Something went wrong");
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

    console.log("✅ Refunds fetched:", res.data);

    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("❌ Get refunds failed:", error.response?.data);

      return rejectWithValue(error.response?.data?.message ?? "Failed to fetch refunds");
    }

    return rejectWithValue("Something went wrong");
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

    console.log("✅ Refunds by cashier:", res.data);

    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("❌ Refunds by cashier failed:", error.response?.data);

      return rejectWithValue(
        error.response?.data?.message ?? "Failed to fetch refunds by cashier"
      );
    }

    return rejectWithValue("Something went wrong");
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

    console.log("✅ Refunds by branch:", res.data);

    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("❌ Refunds by branch failed:", error.response?.data);

      return rejectWithValue(
        error.response?.data?.message ?? "Failed to fetch refunds by branch"
      );
    }

    return rejectWithValue("Something went wrong");
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

    console.log("✅ Refunds by shift:", res.data);

    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("❌ Refunds by shift failed:", error.response?.data);

      return rejectWithValue(
        error.response?.data?.message ?? "Failed to fetch refunds by shift"
      );
    }

    return rejectWithValue("Something went wrong");
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

      console.log("✅ Refunds by cashier and date range:", res.data);

      return res.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          "❌ Refunds by cashier and date range failed:",
          error.response?.data
        );

        return rejectWithValue(
          error.response?.data?.message ?? "Failed to fetch refunds"
        );
      }

      return rejectWithValue("Something went wrong");
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

    console.log("✅ Refund fetched:", res.data);

    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("❌ Get refund by id failed:", error.response?.data);

      return rejectWithValue(error.response?.data?.message ?? "Refund not found");
    }

    return rejectWithValue("Something went wrong");
  }
});

// ================= DELETE REFUND =================

export const deleteRefund = createAsyncThunk<string, string, { rejectValue: string }>(
  "refund/delete",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/refunds/${id}`);

      console.log("✅ Refund deleted:", id);

      return id;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("❌ Delete refund failed:", error.response?.data);

        return rejectWithValue(
          error.response?.data?.message ?? "Failed to delete refund"
        );
      }

      return rejectWithValue("Something went wrong");
    }
  }
);
