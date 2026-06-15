import { createAsyncThunk } from "@reduxjs/toolkit";
import { api, getErrorMessage } from "@/lib/axios";

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
    return rejectWithValue(getErrorMessage(error));
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
    // console.log("Store by ID fulfilled:", res.data);

    return res.data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
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
    return rejectWithValue(getErrorMessage(error));
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
    return rejectWithValue(getErrorMessage(error));
  }
});

// ================= DELETE STORE =================

export const deleteStore = createAsyncThunk<void, void, { rejectValue: string }>(
  "store/delete",
  async (_, { rejectWithValue }) => {
    try {
      await api.delete("/stores");
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
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
    return rejectWithValue(getErrorMessage(error));
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
    return rejectWithValue(getErrorMessage(error));
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
    return rejectWithValue(getErrorMessage(error));
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
    return rejectWithValue(getErrorMessage(error));
  }
});

// ================= MODERATE STORE (SUPER ADMIN) =================

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
    return rejectWithValue(getErrorMessage(error));
  }
});

// ====================== DEACTIVATE STORE ======================
export const deactivateStore = createAsyncThunk<
  StoreResponse,
  void,
  { rejectValue: string }
>("store/deactivate", async (_, { rejectWithValue }) => {
  try {
    const res = await api.patch<StoreResponse>("/stores/deactivate");

    return res.data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});
