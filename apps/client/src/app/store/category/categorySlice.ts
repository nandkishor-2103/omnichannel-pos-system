import { createSlice } from "@reduxjs/toolkit";

import {
  createCategory,
  getCategoriesByStore,
  updateCategory,
  deleteCategory,
} from "./categoryThunk";

import type { CategoryState } from "./categoryTypes";

const initialState: CategoryState = {
  categories: [],
  loading: false,
  error: null,
};

const categorySlice = createSlice({
  name: "category",
  initialState,

  reducers: {
    clearCategoryState: (state) => {
      state.categories = [];
      state.loading = false;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // ================= CREATE =================

      .addCase(createCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(createCategory.fulfilled, (state, action) => {
        state.loading = false;

        state.categories.unshift(action.payload.payload.category);
      })

      .addCase(createCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to create category";
      })

      // ================= GET BY STORE =================

      .addCase(getCategoriesByStore.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getCategoriesByStore.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload.payload.categories;
      })

      .addCase(getCategoriesByStore.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to fetch categories";
      })

      // ================= UPDATE =================

      .addCase(updateCategory.pending, (state) => {
        state.loading = true;
      })

      .addCase(updateCategory.fulfilled, (state, action) => {
        state.loading = false;

        const updatedCategory = action.payload.payload.category;

        state.categories = state.categories.filter(
          (category) => category.id !== updatedCategory.id
        );

        state.categories.unshift(updatedCategory);
      })

      .addCase(updateCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to update category";
      })

      // ================= DELETE =================

      .addCase(deleteCategory.pending, (state) => {
        state.loading = true;
      })

      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.loading = false;

        state.categories = state.categories.filter(
          (category) => category.id !== action.payload
        );
      })

      .addCase(deleteCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to delete category";
      });
  },
});

export const { clearCategoryState } = categorySlice.actions;

export default categorySlice.reducer;
