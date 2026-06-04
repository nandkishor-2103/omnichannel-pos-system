import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "@/lib/axios";

import type {
  InventoryResponse,
  InventoriesResponse,
  CreateInventoryPayload,
  UpdateInventoryPayload,
} from "./inventoryTypes";

// ================= CREATE INVENTORY =================

export const createInventory = createAsyncThunk<
  InventoryResponse,
  CreateInventoryPayload,
  { rejectValue: string }
>("inventory/create", async (dto, { rejectWithValue }) => {
  try {
    const res = await api.post<InventoryResponse>("/inventories", dto);

    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(
        error.response?.data?.message ?? "Failed to create inventory"
      );
    }

    return rejectWithValue("Something went wrong");
  }
});

// ================= UPDATE INVENTORY =================

export const updateInventory = createAsyncThunk<
  InventoryResponse,
  UpdateInventoryPayload,
  { rejectValue: string }
>("inventory/update", async ({ id, dto }, { rejectWithValue }) => {
  try {
    const res = await api.put<InventoryResponse>(`/inventories/${id}`, dto);

    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(
        error.response?.data?.message ?? "Failed to update inventory"
      );
    }

    return rejectWithValue("Something went wrong");
  }
});

// ================= DELETE INVENTORY =================

export const deleteInventory = createAsyncThunk<string, string, { rejectValue: string }>(
  "inventory/delete",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/inventories/${id}`);

      return id;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data?.message ?? "Failed to delete inventory"
        );
      }

      return rejectWithValue("Something went wrong");
    }
  }
);

// ================= GET INVENTORY BY ID =================

export const getInventoryById = createAsyncThunk<
  InventoryResponse,
  string,
  { rejectValue: string }
>("inventory/getById", async (id, { rejectWithValue }) => {
  try {
    const res = await api.get<InventoryResponse>(`/inventories/${id}`);

    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data?.message ?? "Inventory not found");
    }

    return rejectWithValue("Something went wrong");
  }
});

// ================= GET INVENTORY BY BRANCH =================

export const getInventoryByBranch = createAsyncThunk<
  InventoriesResponse,
  string,
  { rejectValue: string }
>("inventory/getByBranch", async (branchId, { rejectWithValue }) => {
  try {
    const res = await api.get<InventoriesResponse>(`/inventories/branch/${branchId}`);

    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(
        error.response?.data?.message ?? "Failed to fetch branch inventory"
      );
    }

    return rejectWithValue("Something went wrong");
  }
});

// ================= GET INVENTORY BY PRODUCT =================

export const getInventoryByProduct = createAsyncThunk<
  InventoryResponse,
  string,
  { rejectValue: string }
>("inventory/getByProduct", async (productId, { rejectWithValue }) => {
  try {
    const res = await api.get<InventoryResponse>(`/inventories/product/${productId}`);

    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(
        error.response?.data?.message ?? "Failed to fetch product inventory"
      );
    }

    return rejectWithValue("Something went wrong");
  }
});
