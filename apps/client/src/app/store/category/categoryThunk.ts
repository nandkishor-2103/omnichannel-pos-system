import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "@/lib/axios";

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

    console.log("Create category:", res.data);

    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(
        error.response?.data?.message ?? "Failed to create category"
      );
    }

    return rejectWithValue("Something went wrong");
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

    console.log("Get categories:", res.data);

    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(
        error.response?.data?.message ?? "Failed to fetch categories"
      );
    }

    return rejectWithValue("Something went wrong");
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

    console.log("Update category:", res.data);

    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(
        error.response?.data?.message ?? "Failed to update category"
      );
    }

    return rejectWithValue("Something went wrong");
  }
});

// ================= DELETE CATEGORY =================

export const deleteCategory = createAsyncThunk<string, string, { rejectValue: string }>(
  "category/delete",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/categories/${id}`);

      console.log("Delete category:", id);

      return id;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data?.message ?? "Failed to delete category"
        );
      }

      return rejectWithValue("Something went wrong");
    }
  }
);
