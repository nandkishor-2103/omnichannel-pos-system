import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { api, getErrorMessage } from "@/lib/axios";

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

    return res.data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

// ================= UPDATE CUSTOMER =================

export const updateCustomer = createAsyncThunk<
  CustomerResponse,
  UpdateCustomerPayload,
  { rejectValue: string }
>("customer/update", async ({ id, customerData }, { rejectWithValue }) => {
  try {
    const res = await api.put<CustomerResponse>(`/customers/${id}`, customerData);

    return res.data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

// ================= DELETE CUSTOMER =================

export const deleteCustomer = createAsyncThunk<string, string, { rejectValue: string }>(
  "customer/delete",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/customers/${id}`);

      return id;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
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
    const response = await api.get<CustomerResponse>(`/customers/${id}`);

    return response.data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
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

    return res.data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
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

    return res.data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});
