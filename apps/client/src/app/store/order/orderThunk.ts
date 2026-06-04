import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "@/lib/axios";

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

    console.log("✅ Order created:", res.data);

    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("❌ Create order failed:", error.response?.data);

      return rejectWithValue(error.response?.data?.message ?? "Failed to create order");
    }

    return rejectWithValue("Something went wrong");
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

    console.log("✅ Order fetched:", res.data);

    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("❌ Get order failed:", error.response?.data);

      return rejectWithValue(error.response?.data?.message ?? "Order not found");
    }

    return rejectWithValue("Something went wrong");
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

    console.log("✅ Orders by branch:", res.data);

    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("❌ Orders by branch failed:", error.response?.data);

      return rejectWithValue(error.response?.data?.message ?? "Failed to fetch orders");
    }

    return rejectWithValue("Something went wrong");
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

    console.log("✅ Orders by cashier:", res.data);

    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("❌ Orders by cashier failed:", error.response?.data);

      return rejectWithValue(error.response?.data?.message ?? "Failed to fetch orders");
    }

    return rejectWithValue("Something went wrong");
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

    console.log("✅ Today's orders:", res.data);

    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("❌ Today's orders failed:", error.response?.data);

      return rejectWithValue(
        error.response?.data?.message ?? "Failed to fetch today's orders"
      );
    }

    return rejectWithValue("Something went wrong");
  }
});

// ================= DELETE ORDER =================

export const deleteOrder = createAsyncThunk<string, string, { rejectValue: string }>(
  "order/delete",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/orders/${id}`);

      console.log("✅ Order deleted:", id);

      return id;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("❌ Delete order failed:", error.response?.data);

        return rejectWithValue(error.response?.data?.message ?? "Failed to delete order");
      }

      return rejectWithValue("Something went wrong");
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

    console.log("✅ Customer orders:", res.data);

    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("❌ Customer orders failed:", error.response?.data);

      return rejectWithValue(
        error.response?.data?.message ?? "Failed to fetch customer orders"
      );
    }

    return rejectWithValue("Something went wrong");
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

    console.log("✅ Recent orders:", res.data);

    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("❌ Recent orders failed:", error.response?.data);

      return rejectWithValue(
        error.response?.data?.message ?? "Failed to fetch recent orders"
      );
    }

    return rejectWithValue("Something went wrong");
  }
});
