import { createSlice } from "@reduxjs/toolkit";

import {
  createCustomer,
  deleteCustomer,
  getAllCustomers,
  getCustomerById,
  searchCustomer,
  updateCustomer,
} from "./customerThunk";

import type { Customer } from "./customerTypes";

interface CustomerState {
  customers: Customer[];
  selectedCustomer: Customer | null;
  loading: boolean;
  error: string | null;
}

const initialState: CustomerState = {
  customers: [],
  selectedCustomer: null,
  loading: false,
  error: null,
};

const customerSlice = createSlice({
  name: "customer",

  initialState,

  reducers: {
    clearCustomerState: (state) => {
      state.customers = [];
      state.selectedCustomer = null;
      state.error = null;
      state.loading = false;
    },

    clearSelectedCustomer: (state) => {
      state.selectedCustomer = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // ================= CREATE CUSTOMER =================

      .addCase(createCustomer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(createCustomer.fulfilled, (state, action) => {
        state.loading = false;

        state.customers.unshift(action.payload.customer);
      })

      .addCase(createCustomer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to create customer";
      })

      // ================= UPDATE CUSTOMER =================

      .addCase(updateCustomer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(updateCustomer.fulfilled, (state, action) => {
        state.loading = false;

        const updatedCustomer = action.payload.customer;

        const index = state.customers.findIndex(
          (customer) => customer._id === updatedCustomer._id
        );

        if (index !== -1) {
          state.customers[index] = updatedCustomer;
        }

        if (
          state.selectedCustomer &&
          state.selectedCustomer._id === updatedCustomer._id
        ) {
          state.selectedCustomer = updatedCustomer;
        }
      })

      .addCase(updateCustomer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to update customer";
      })

      // ================= DELETE CUSTOMER =================

      .addCase(deleteCustomer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(deleteCustomer.fulfilled, (state, action) => {
        state.loading = false;

        state.customers = state.customers.filter(
          (customer) => customer._id !== action.payload
        );

        if (state.selectedCustomer && state.selectedCustomer._id === action.payload) {
          state.selectedCustomer = null;
        }
      })

      .addCase(deleteCustomer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to delete customer";
      })

      // ================= GET CUSTOMER BY ID =================

      .addCase(getCustomerById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getCustomerById.fulfilled, (state, action) => {
        state.loading = false;

        state.selectedCustomer = action.payload.customer;
      })

      .addCase(getCustomerById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Customer not found";
      })

      // ================= GET ALL CUSTOMERS =================

      .addCase(getAllCustomers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getAllCustomers.fulfilled, (state, action) => {
        state.loading = false;

        state.customers = action.payload.customers;
      })

      .addCase(getAllCustomers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to fetch customers";
      })

      // ================= SEARCH CUSTOMER =================

      .addCase(searchCustomer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(searchCustomer.fulfilled, (state, action) => {
        state.loading = false;

        state.customers = action.payload.customers;
      })

      .addCase(searchCustomer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to search customers";
      });
  },
});

export const { clearCustomerState, clearSelectedCustomer } = customerSlice.actions;

export default customerSlice.reducer;
