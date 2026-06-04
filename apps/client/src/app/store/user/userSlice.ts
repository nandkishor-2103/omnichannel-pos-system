import { createSlice } from "@reduxjs/toolkit";

import {
  getAllCashiers,
  getAllCustomers,
  getUserById,
  getUserProfile,
//   logout,
} from "./userThunk";

import type { UserState } from "../user/userTypes";

const initialState: UserState = {
  userProfile: null,
  users: [],
  customers: [],
  cashiers: [],
  selectedUser: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    clearUserState: (state) => {
      state.userProfile = null;
      state.users = [];
      state.customers = [];
      state.cashiers = [];
      state.selectedUser = null;
      state.error = null;
      state.loading = false;
    },
  },

  extraReducers: (builder) => {
    builder
      // Get Profile
      .addCase(getUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.userProfile = action.payload;
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to fetch profile";
      })

      // Customers
      .addCase(getAllCustomers.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllCustomers.fulfilled, (state, action) => {
        state.loading = false;
        state.customers = action.payload;
      })
      .addCase(getAllCustomers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to fetch customers";
      })

      // Cashiers
      .addCase(getAllCashiers.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllCashiers.fulfilled, (state, action) => {
        state.loading = false;
        state.cashiers = action.payload;
      })
      .addCase(getAllCashiers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to fetch cashiers";
      })

      // User By Id
      .addCase(getUserById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedUser = action.payload;
      })
      .addCase(getUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to fetch user";
      })

      // Logout
     /*  .addCase(logout.fulfilled, (state) => {
        state.userProfile = null;
        state.selectedUser = null;
        state.users = [];
        state.customers = [];
        state.cashiers = [];
        state.loading = false;
        state.error = null;
      }); */
  },
});

export const { clearUserState } = userSlice.actions;

export default userSlice.reducer;
