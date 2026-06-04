import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "@/lib/axios";

import type {
  CustomerResponse,
  CustomersResponse,
  CreateCustomerPayload,
  UpdateCustomerPayload,
} from "./customerTypes";

// ================= CREATE CUSTOMER =================

export const createCustomer = createAsyncThunk<
  CustomerResponse,
  CreateCustomerPayload,
  { rejectValue: string }
>("customer/create", async (customerData, { rejectWithValue }) => {
  try {
    const res = await api.post<CustomerResponse>("/customers", customerData);

    console.log("✅ Customer created:", res.data);

    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("❌ Create customer failed:", error.response?.data);

      return rejectWithValue(
        error.response?.data?.message ?? "Failed to create customer"
      );
    }

    return rejectWithValue("Something went wrong");
  }
});

// ================= UPDATE CUSTOMER =================

export const updateCustomer = createAsyncThunk<
  CustomerResponse,
  UpdateCustomerPayload,
  { rejectValue: string }
>("customer/update", async ({ id, customer }, { rejectWithValue }) => {
  try {
    const res = await api.put<CustomerResponse>(`/customers/${id}`, customer);

    console.log("✅ Customer updated:", res.data);

    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("❌ Update customer failed:", error.response?.data);

      return rejectWithValue(
        error.response?.data?.message ?? "Failed to update customer"
      );
    }

    return rejectWithValue("Something went wrong");
  }
});

// ================= DELETE CUSTOMER =================

export const deleteCustomer = createAsyncThunk<string, string, { rejectValue: string }>(
  "customer/delete",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/customers/${id}`);

      console.log("✅ Customer deleted:", id);

      return id;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("❌ Delete customer failed:", error.response?.data);

        return rejectWithValue(
          error.response?.data?.message ?? "Failed to delete customer"
        );
      }

      return rejectWithValue("Something went wrong");
    }
  }
);

// ================= GET CUSTOMER BY ID =================

export const getCustomerById = createAsyncThunk<
  CustomerResponse,
  string,
  { rejectValue: string }
>("customer/getById", async (id, { rejectWithValue }) => {
  try {
    const res = await api.get<CustomerResponse>(`/customers/${id}`);

    console.log("✅ Customer fetched:", res.data);

    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("❌ Get customer failed:", error.response?.data);

      return rejectWithValue(error.response?.data?.message ?? "Customer not found");
    }

    return rejectWithValue("Something went wrong");
  }
});

// ================= GET ALL CUSTOMERS =================

export const getAllCustomers = createAsyncThunk<
  CustomersResponse,
  void,
  { rejectValue: string }
>("customer/getAll", async (_, { rejectWithValue }) => {
  try {
    const res = await api.get<CustomersResponse>("/customers");

    console.log("✅ Customers fetched:", res.data);

    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("❌ Get customers failed:", error.response?.data);

      return rejectWithValue(
        error.response?.data?.message ?? "Failed to fetch customers"
      );
    }

    return rejectWithValue("Something went wrong");
  }
});

// ================= SEARCH CUSTOMER =================

export const searchCustomer = createAsyncThunk<
  CustomersResponse,
  string,
  { rejectValue: string }
>("customer/search", async (query, { rejectWithValue }) => {
  try {
    const res = await api.get<CustomersResponse>(
      `/customers/search?q=${encodeURIComponent(query)}`
    );

    console.log("✅ Customer search:", res.data);

    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("❌ Search customer failed:", error.response?.data);

      return rejectWithValue(
        error.response?.data?.message ?? "Failed to search customers"
      );
    }

    return rejectWithValue("Something went wrong");
  }
});
