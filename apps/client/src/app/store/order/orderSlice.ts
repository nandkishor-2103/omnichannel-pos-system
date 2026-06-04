import { createSlice } from "@reduxjs/toolkit";

import {
  createOrder,
  deleteOrder,
  getOrderById,
  getOrdersByBranch,
  getOrdersByCashier,
  getOrdersByCustomer,
  getRecentOrdersByBranch,
  getTodayOrdersByBranch,
} from "./orderThunk";

import type { Order } from "./orderTypes";

interface OrderState {
  orders: Order[];
  todayOrders: Order[];
  customerOrders: Order[];
  recentOrders: Order[];
  selectedOrder: Order | null;
  loading: boolean;
  error: string | null;
}

const initialState: OrderState = {
  orders: [],
  todayOrders: [],
  customerOrders: [],
  recentOrders: [],
  selectedOrder: null,
  loading: false,
  error: null,
};

const orderSlice = createSlice({
  name: "order",

  initialState,

  reducers: {
    clearOrderState: (state) => {
      state.orders = [];
      state.todayOrders = [];
      state.customerOrders = [];
      state.recentOrders = [];
      state.selectedOrder = null;
      state.loading = false;
      state.error = null;
    },

    clearCustomerOrders: (state) => {
      state.customerOrders = [];
    },
  },

  extraReducers: (builder) => {
    builder

      // ================= CREATE ORDER =================

      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;

        state.orders.unshift(action.payload.order);
      })

      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to create order";
      })

      // ================= GET ORDER BY ID =================

      .addCase(getOrderById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getOrderById.fulfilled, (state, action) => {
        state.loading = false;

        state.selectedOrder = action.payload.order;
      })

      .addCase(getOrderById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Order not found";
      })

      // ================= GET ORDERS BY BRANCH =================

      .addCase(getOrdersByBranch.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getOrdersByBranch.fulfilled, (state, action) => {
        state.loading = false;

        state.orders = action.payload.orders;
      })

      .addCase(getOrdersByBranch.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to fetch orders";
      })

      // ================= GET ORDERS BY CASHIER =================

      .addCase(getOrdersByCashier.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getOrdersByCashier.fulfilled, (state, action) => {
        state.loading = false;

        state.orders = action.payload.orders;
      })

      .addCase(getOrdersByCashier.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to fetch orders";
      })

      // ================= TODAY ORDERS =================

      .addCase(getTodayOrdersByBranch.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getTodayOrdersByBranch.fulfilled, (state, action) => {
        state.loading = false;

        state.todayOrders = action.payload.orders;
      })

      .addCase(getTodayOrdersByBranch.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to fetch today's orders";
      })

      // ================= CUSTOMER ORDERS =================

      .addCase(getOrdersByCustomer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getOrdersByCustomer.fulfilled, (state, action) => {
        state.loading = false;

        state.customerOrders = action.payload.orders;
      })

      .addCase(getOrdersByCustomer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to fetch customer orders";
      })

      // ================= RECENT ORDERS =================

      .addCase(getRecentOrdersByBranch.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getRecentOrdersByBranch.fulfilled, (state, action) => {
        state.loading = false;

        state.recentOrders = action.payload.orders;
      })

      .addCase(getRecentOrdersByBranch.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to fetch recent orders";
      })

      // ================= DELETE ORDER =================

      .addCase(deleteOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.loading = false;

        state.orders = state.orders.filter((order) => order._id !== action.payload);

        if (state.selectedOrder && state.selectedOrder._id === action.payload) {
          state.selectedOrder = null;
        }
      })

      .addCase(deleteOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to delete order";
      });
  },
});

export const { clearOrderState, clearCustomerOrders } = orderSlice.actions;

export default orderSlice.reducer;
