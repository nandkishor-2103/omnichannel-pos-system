import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { api, getErrorMessage } from "@/lib/axios";

import type {
  CreateOrderPayload,
  OrderResponse,
  OrdersResponse,
  OrdersByBranchPayload,
} from "./orderTypes";

// ================= CREATE ORDER =================

export const createOrder = createAsyncThunk<
  OrderResponse,
  CreateOrderPayload,
  { rejectValue: string }
>("order/create", async (dto, { rejectWithValue }) => {
  try {
    const res = await api.post<OrderResponse>("/orders", dto);

    return res.data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

// ================= GET ORDER BY ID =================

export const getOrderById = createAsyncThunk<
  OrderResponse,
  string,
  { rejectValue: string }
>("order/getById", async (id, { rejectWithValue }) => {
  try {
    const res = await api.get<OrderResponse>(`/orders/${id}`);

    return res.data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

// ================= GET ORDERS BY BRANCH =================

export const getOrdersByBranch = createAsyncThunk<
  OrdersResponse,
  OrdersByBranchPayload,
  { rejectValue: string }
>("order/getByBranch", async (filters, { rejectWithValue }) => {
  try {
    const { branchId, customerId, cashierId, paymentType, status } = filters;

    const params = new URLSearchParams();

    if (customerId) params.append("customerId", customerId);
    if (cashierId) params.append("cashierId", cashierId);
    if (paymentType) params.append("paymentType", paymentType);
    if (status) params.append("status", status);

    const query = params.toString();

    const res = await api.get<OrdersResponse>(
      `/orders/branch/${branchId}${query ? `?${query}` : ""}`
    );

    return res.data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

// ================= GET ORDERS BY CASHIER =================

export const getOrdersByCashier = createAsyncThunk<
  OrdersResponse,
  string,
  { rejectValue: string }
>("order/getByCashier", async (cashierId, { rejectWithValue }) => {
  try {
    const res = await api.get<OrdersResponse>(`/orders/cashier/${cashierId}`);

    return res.data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

// ================= GET TODAY ORDERS BY BRANCH =================

export const getTodayOrdersByBranch = createAsyncThunk<
  OrdersResponse,
  string,
  { rejectValue: string }
>("order/getTodayByBranch", async (branchId, { rejectWithValue }) => {
  try {
    const res = await api.get<OrdersResponse>(`/orders/today/branch/${branchId}`);

    return res.data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

// ================= DELETE ORDER =================

export const deleteOrder = createAsyncThunk<string, string, { rejectValue: string }>(
  "order/delete",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/orders/${id}`);

      return id;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

// ================= GET ORDERS BY CUSTOMER =================

export const getOrdersByCustomer = createAsyncThunk<
  OrdersResponse,
  string,
  { rejectValue: string }
>("order/getByCustomer", async (customerId, { rejectWithValue }) => {
  try {
    const res = await api.get<OrdersResponse>(`/orders/customer/${customerId}`);

    return res.data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

// ================= RECENT ORDERS =================

export const getRecentOrdersByBranch = createAsyncThunk<
  OrdersResponse,
  string,
  { rejectValue: string }
>("order/getRecentByBranch", async (branchId, { rejectWithValue }) => {
  try {
    const res = await api.get<OrdersResponse>(`/orders/recent/${branchId}`);

    return res.data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});
