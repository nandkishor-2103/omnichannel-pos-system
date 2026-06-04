import { createSlice } from "@reduxjs/toolkit";

import {
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
  getProductsByStore,
  searchProducts,
} from "./productThunk";

import type { ProductState } from "./productTypes";

const initialState: ProductState = {
  products: [],
  product: null,
  searchResults: [],
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: "product",

  initialState,

  reducers: {
    clearProductState: (state) => {
      state.product = null;
      state.products = [];
      state.searchResults = [];
      state.loading = false;
      state.error = null;
    },

    clearSearchResults: (state) => {
      state.searchResults = [];
    },
  },

  extraReducers: (builder) => {
    builder

      // CREATE

      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products.push(action.payload.product);
      })

      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to create product";
      })

      // GET BY ID

      .addCase(getProductById.fulfilled, (state, action) => {
        state.product = action.payload.product;
      })

      // UPDATE

      .addCase(updateProduct.fulfilled, (state, action) => {
        const updatedProduct = action.payload.product;

        const index = state.products.findIndex((p) => p._id === updatedProduct._id);

        if (index !== -1) {
          state.products[index] = updatedProduct;
        }

        if (state.product?._id === updatedProduct._id) {
          state.product = updatedProduct;
        }
      })

      // DELETE

      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter((p) => p._id !== action.payload);

        if (state.product?._id === action.payload) {
          state.product = null;
        }
      })

      // GET BY STORE

      .addCase(getProductsByStore.fulfilled, (state, action) => {
        state.products = action.payload.products;
      })

      // SEARCH

      .addCase(searchProducts.pending, (state) => {
        state.loading = true;
      })

      .addCase(searchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.searchResults = action.payload.products;
      })

      .addCase(searchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Search failed";
      });
  },
});

export const { clearProductState, clearSearchResults } = productSlice.actions;

export default productSlice.reducer;
