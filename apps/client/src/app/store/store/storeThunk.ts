import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "@/lib/axios";

import type {
  StoreResponse,
  StoresResponse,
  StoreEmployeesResponse,
  CreateStorePayload,
  UpdateStorePayload,
  ModerateStorePayload,
  StoreEmployee,
} from "./storeTypes";

// ================= CREATE STORE =================

export const createStore = createAsyncThunk<
  StoreResponse,
  CreateStorePayload,
  { rejectValue: string }
>("store/create", async (storeData, { rejectWithValue }) => {
  try {
    const res = await api.post<StoreResponse>("/stores", storeData);

    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data?.message ?? "Failed to create store");
    }

    return rejectWithValue("Something went wrong");
  }
});

// ================= GET STORE BY ID =================

export const getStoreById = createAsyncThunk<
  StoreResponse,
  string,
  { rejectValue: string }
>("store/getById", async (id, { rejectWithValue }) => {
  try {
    const res = await api.get<StoreResponse>(`/stores/${id}`);

    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data?.message ?? "Store not found");
    }

    return rejectWithValue("Something went wrong");
  }
});

// ================= GET ALL STORES =================

export const getAllStores = createAsyncThunk<
  StoresResponse,
  string | undefined,
  { rejectValue: string }
>("store/getAll", async (status, { rejectWithValue }) => {
  try {
    const res = await api.get<StoresResponse>("/stores", {
      params: status ? { status } : undefined,
    });

    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data?.message ?? "Failed to fetch stores");
    }

    return rejectWithValue("Something went wrong");
  }
});

// ================= UPDATE STORE =================

export const updateStore = createAsyncThunk<
  StoreResponse,
  UpdateStorePayload,
  { rejectValue: string }
>("store/update", async ({ id, storeData }, { rejectWithValue }) => {
  try {
    const res = await api.put<StoreResponse>(`/stores/${id}`, storeData);

    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data?.message ?? "Failed to update store");
    }

    return rejectWithValue("Something went wrong");
  }
});

// ================= DELETE STORE =================

export const deleteStore = createAsyncThunk<void, void, { rejectValue: string }>(
  "store/delete",
  async (_, { rejectWithValue }) => {
    try {
      await api.delete("/stores");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message ?? "Failed to delete store");
      }

      return rejectWithValue("Something went wrong");
    }
  }
);

// ================= GET STORE BY ADMIN =================

export const getStoreByAdmin = createAsyncThunk<
  StoreResponse,
  void,
  { rejectValue: string }
>("store/getByAdmin", async (_, { rejectWithValue }) => {
  try {
    const res = await api.get<StoreResponse>("/stores/admin");

    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data?.message ?? "Not authorized");
    }

    return rejectWithValue("Something went wrong");
  }
});

// ================= GET STORE BY EMPLOYEE =================

export const getStoreByEmployee = createAsyncThunk<
  StoreResponse,
  void,
  { rejectValue: string }
>("store/getByEmployee", async (_, { rejectWithValue }) => {
  try {
    const res = await api.get<StoreResponse>("/stores/employee");

    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data?.message ?? "Not authorized");
    }

    return rejectWithValue("Something went wrong");
  }
});

// ================= GET STORE EMPLOYEES =================

export const getStoreEmployees = createAsyncThunk<
  StoreEmployeesResponse,
  string,
  { rejectValue: string }
>("store/getEmployees", async (storeId, { rejectWithValue }) => {
  try {
    const res = await api.get<StoreEmployeesResponse>(`/stores/${storeId}/employee/list`);

    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data?.message ?? "Failed to get employees");
    }

    return rejectWithValue("Something went wrong");
  }
});

// ================= ADD EMPLOYEE =================

export const addEmployee = createAsyncThunk<
  StoreEmployee,
  Record<string, unknown>,
  { rejectValue: string }
>("store/addEmployee", async (employeeData, { rejectWithValue }) => {
  try {
    const res = await api.post<StoreEmployee>("/stores/add/employee", employeeData);

    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data?.message ?? "Failed to add employee");
    }

    return rejectWithValue("Something went wrong");
  }
});

// ================= MODERATE STORE =================

export const moderateStore = createAsyncThunk<
  StoreResponse,
  ModerateStorePayload,
  { rejectValue: string }
>("store/moderateStore", async ({ storeId, action }, { rejectWithValue }) => {
  try {
    const res = await api.put<StoreResponse>(`/stores/${storeId}/moderate`, null, {
      params: { action },
    });

    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data?.message ?? "Failed to moderate store");
    }

    return rejectWithValue("Something went wrong");
  }
});
