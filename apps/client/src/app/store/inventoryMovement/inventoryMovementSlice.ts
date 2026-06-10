import { createSlice } from "@reduxjs/toolkit";

import type { InventoryMovementState } from "./inventoryMovementTypes";

import {
  getInventoryMovements,
  getInventoryMovementsByProduct,
} from "./inventoryMovementThunk";

const initialState: InventoryMovementState = {
  movements: [],
  loading: false,
  error: null,
};

const inventoryMovementSlice = createSlice({
  name: "inventoryMovement",

  initialState,

  reducers: {
    clearInventoryMovements: (state) => {
      state.movements = [];
      state.loading = false;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // ===== GET ALL MOVEMENTS =====

      .addCase(getInventoryMovements.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getInventoryMovements.fulfilled, (state, action) => {
        state.loading = false;
        state.movements = action.payload;
      })

      .addCase(getInventoryMovements.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to fetch inventory movements";
      })

      // ===== GET PRODUCT MOVEMENTS =====

      .addCase(getInventoryMovementsByProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getInventoryMovementsByProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.movements = action.payload;
      })

      .addCase(getInventoryMovementsByProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to fetch product inventory movements";
      });
  },
});

export const { clearInventoryMovements } = inventoryMovementSlice.actions;

export default inventoryMovementSlice.reducer;
