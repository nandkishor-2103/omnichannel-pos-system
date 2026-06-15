import { createSlice } from "@reduxjs/toolkit";

import {
  createStore,
  getStoreById,
  getAllStores,
  updateStore,
  deleteStore,
  getStoreByAdmin,
  getStoreByEmployee,
  getStoreEmployees,
  addEmployee,
  moderateStore,
  deactivateStore,
} from "./storeThunk";

import type { StoreState } from "./storeTypes";

const initialState: StoreState = {
  store: null,
  stores: [],
  employees: [],
  loading: false,
  error: null,
};

const storeSlice = createSlice({
  name: "store",
  initialState,

  reducers: {
    clearStoreState: (state) => {
      state.store = null;
      state.stores = [];
      state.employees = [];
      state.loading = false;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // CREATE

      .addCase(createStore.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(createStore.fulfilled, (state, action) => {
        state.loading = false;
        state.store = action.payload.payload.store;
      })

      .addCase(createStore.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to create store";
      })

      // GET BY ID

      .addCase(getStoreById.fulfilled, (state, action) => {
        state.store = action.payload.payload.store;
      })

      // GET ALL

      .addCase(getAllStores.fulfilled, (state, action) => {
        state.stores = action.payload.stores;
      })

      // UPDATE

      .addCase(updateStore.fulfilled, (state, action) => {
        state.store = action.payload.payload.store;
      })

      // DELETE

      .addCase(deleteStore.fulfilled, (state) => {
        state.store = null;
      })

      // ADMIN

      .addCase(getStoreByAdmin.fulfilled, (state, action) => {
        state.store = action.payload.payload.store;
      })

      // EMPLOYEE

      .addCase(getStoreByEmployee.fulfilled, (state, action) => {
        state.store = action.payload.payload.store;
      })

      // EMPLOYEES

      .addCase(getStoreEmployees.fulfilled, (state, action) => {
        state.employees = action.payload.employees;
      })

      .addCase(addEmployee.fulfilled, (state, action) => {
        state.employees.push(action.payload);
      })

      // MODERATE

      .addCase(moderateStore.fulfilled, (state, action) => {
        const updatedStore = action.payload.payload.store;

        state.stores = state.stores.map((store) =>
          store._id === updatedStore._id ? updatedStore : store
        );

        if (state.store?._id === updatedStore._id) {
          state.store = updatedStore;
        }
      })

      .addCase(deactivateStore.fulfilled, (state, action) => {
        state.store = action.payload.payload.store;
      });
  },
});

export const { clearStoreState } = storeSlice.actions;

export default storeSlice.reducer;
