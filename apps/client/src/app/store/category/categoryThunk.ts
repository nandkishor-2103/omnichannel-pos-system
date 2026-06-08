import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { api, getErrorMessage } from "@/lib/axios";

import type {
  CategoryResponse,
  CategoriesResponse,
  CreateCategoryPayload,
  UpdateCategoryPayload,
} from "./categoryTypes";

// ================= CREATE CATEGORY =================

export const createCategory = createAsyncThunk<
  CategoryResponse,
  CreateCategoryPayload,
  { rejectValue: string }
>("category/create", async (dto, { rejectWithValue }) => {
  try {
    const res = await api.post<CategoryResponse>("/categories", dto);

    return res.data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

// ================= GET CATEGORIES BY STORE =================

export const getCategoriesByStore = createAsyncThunk<
  CategoriesResponse,
  string,
  { rejectValue: string }
>("category/getByStore", async (storeId, { rejectWithValue }) => {
  try {
    const res = await api.get<CategoriesResponse>(`/categories/store/${storeId}`);

    return res.data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

// ================= UPDATE CATEGORY =================

export const updateCategory = createAsyncThunk<
  CategoryResponse,
  UpdateCategoryPayload,
  { rejectValue: string }
>("category/update", async ({ id, dto }, { rejectWithValue }) => {
  try {
    const res = await api.put<CategoryResponse>(`/categories/${id}`, dto);

    return res.data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

// ================= DELETE CATEGORY =================

export const deleteCategory = createAsyncThunk<string, string, { rejectValue: string }>(
  "category/delete",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/categories/${id}`);

      return id;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);
