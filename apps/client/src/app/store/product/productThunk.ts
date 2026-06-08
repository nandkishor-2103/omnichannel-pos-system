import { createAsyncThunk } from "@reduxjs/toolkit";
import { api, getErrorMessage } from "@/lib/axios";

import type {
  ProductResponse,
  ProductsResponse,
  CreateProductPayload,
  UpdateProductPayload,
  SearchProductsPayload,
} from "./productTypes";

// ================= CREATE PRODUCT =================

export const createProduct = createAsyncThunk<
  ProductResponse,
  CreateProductPayload,
  { rejectValue: string }
>("product/create", async (dto, { rejectWithValue }) => {
  try {
    const res = await api.post<ProductResponse>("/products", dto);

    return res.data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

// ================= GET PRODUCT =================

export const getProductById = createAsyncThunk<
  ProductResponse,
  string,
  { rejectValue: string }
>("product/getById", async (id, { rejectWithValue }) => {
  try {
    const res = await api.get<ProductResponse>(`/products/${id}`);

    return res.data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

// ================= UPDATE PRODUCT =================

export const updateProduct = createAsyncThunk<
  ProductResponse,
  UpdateProductPayload,
  { rejectValue: string }
>("product/update", async ({ id, dto }, { rejectWithValue }) => {
  try {
    const res = await api.patch<ProductResponse>(`/products/${id}`, dto);

    return res.data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

// ================= DELETE PRODUCT =================

export const deleteProduct = createAsyncThunk<string, string, { rejectValue: string }>(
  "product/delete",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/products/${id}`);

      return id;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

// ================= PRODUCTS BY STORE =================

export const getProductsByStore = createAsyncThunk<
  ProductsResponse,
  string,
  { rejectValue: string }
>("product/getByStore", async (storeId, { rejectWithValue }) => {
  try {
    const res = await api.get<ProductsResponse>(`/products/store/${storeId}`);

    return res.data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

// ================= SEARCH PRODUCTS =================

export const searchProducts = createAsyncThunk<
  ProductsResponse,
  SearchProductsPayload,
  { rejectValue: string }
>("product/search", async ({ query, storeId }, { rejectWithValue }) => {
  try {
    const res = await api.get<ProductsResponse>(
      `/products/store/${storeId}/search?q=${encodeURIComponent(query)}`
    );

    return res.data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});
