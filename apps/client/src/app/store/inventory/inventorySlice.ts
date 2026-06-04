import { createSlice } from "@reduxjs/toolkit";

import {
  createInventory,
  updateInventory,
  deleteInventory,
  getInventoryById,
  getInventoryByBranch,
  getInventoryByProduct,
} from "./inventoryThunk";

import type { InventoryState } from "./inventoryTypes";

const initialState: InventoryState = {
  inventories: [],
  inventory: null,
  loading: false,
  error: null,
};

const inventorySlice = createSlice({
  name: "inventory",

  initialState,

  reducers: {
    clearInventoryState: (state) => {
      state.inventories = [];
      state.inventory = null;
      state.loading = false;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // CREATE

      .addCase(createInventory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(createInventory.fulfilled, (state, action) => {
        state.loading = false;
        state.inventories.push(action.payload.inventory);
      })

      .addCase(createInventory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to create inventory";
      })

      // UPDATE

      .addCase(updateInventory.fulfilled, (state, action) => {
        const updatedInventory = action.payload.inventory;

        const index = state.inventories.findIndex(
          (inv) => inv._id === updatedInventory._id
        );

        if (index !== -1) {
          state.inventories[index] = updatedInventory;
        }

        if (state.inventory?._id === updatedInventory._id) {
          state.inventory = updatedInventory;
        }
      })

      // DELETE

      .addCase(deleteInventory.fulfilled, (state, action) => {
        state.inventories = state.inventories.filter((inv) => inv._id !== action.payload);

        if (state.inventory?._id === action.payload) {
          state.inventory = null;
        }
      })

      // GET BY ID

      .addCase(getInventoryById.fulfilled, (state, action) => {
        state.inventory = action.payload.inventory;
      })

      // GET BY BRANCH

      .addCase(getInventoryByBranch.fulfilled, (state, action) => {
        state.inventories = action.payload.inventories;
      })

      // GET BY PRODUCT

      .addCase(getInventoryByProduct.fulfilled, (state, action) => {
        state.inventory = action.payload.inventory;
      });
  },
});

export const { clearInventoryState } = inventorySlice.actions;

export default inventorySlice.reducer;
