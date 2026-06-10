import { createAsyncThunk } from "@reduxjs/toolkit";

import { api, getErrorMessage } from "@/lib/axios";

import type { InventoryMovement } from "./inventoryMovementTypes";

type GetInventoryMovementsResponse = {
  payload: {
    movements: InventoryMovement[];
  };
};

export const getInventoryMovements = createAsyncThunk<
  InventoryMovement[],
  void,
  { rejectValue: string }
>("inventoryMovement/getInventoryMovements", async (_, { rejectWithValue }) => {
  try {
    const response = await api.get<GetInventoryMovementsResponse>("/inventory-movements");

    return response.data.payload.movements;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

export const getInventoryMovementsByProduct = createAsyncThunk<
  InventoryMovement[],
  string,
  { rejectValue: string }
>(
  "inventoryMovement/getInventoryMovementsByProduct",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await api.get<GetInventoryMovementsResponse>(
        `/inventory-movements/product/${productId}`
      );

      return response.data.payload.movements;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);
