import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "@/lib/axios";

import type {
  ProductResponse,
  ProductsResponse,
  CreateProductPayload,
  UpdateProductPayload,
  SearchProductsPayload,
} from "./productTypes";
import { getTestLoadingDelay } from "@/config/appConfig";

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
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data?.message ?? "Failed to create product");
    }

    return rejectWithValue("Something went wrong");
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
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data?.message ?? "Product not found");
    }

    return rejectWithValue("Something went wrong");
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
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data?.message ?? "Failed to update product");
    }

    return rejectWithValue("Something went wrong");
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
      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data?.message ?? "Failed to delete product"
        );
      }

      return rejectWithValue("Something went wrong");
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

    // console.log("Get Store Products: ", res.data)

    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data?.message ?? "Failed to fetch products");
    }

    return rejectWithValue("Something went wrong");
  }
});

// ================= SEARCH PRODUCTS =================

export const searchProducts = createAsyncThunk<
  ProductsResponse,
  SearchProductsPayload,
  { rejectValue: string }
>("product/search", async ({ query, storeId }, { rejectWithValue }) => {
  try {
    // Simulate loading delay
    await getTestLoadingDelay();
    const res = await api.get<ProductsResponse>(
      `/products/store/${storeId}/search?q=${encodeURIComponent(query)}`
    );

    console.log("Search products: ", res.data);

    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data?.message ?? "Search failed");
    }

    return rejectWithValue("Something went wrong");
  }
});
