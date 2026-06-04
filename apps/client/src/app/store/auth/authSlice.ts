import { createSlice } from "@reduxjs/toolkit";
import { signin, signup, logout } from "./authThunk";
import type { AuthState } from "./authTypes";
import { getUserProfile } from "../user/userThunk";

const initialState: AuthState = {
  user: null,
  loading: false,
  initialized: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    clearAuth: (state) => {
      state.user = null;
      state.error = null;
      state.loading = false;
      state.initialized = false;
    },
  },

  extraReducers: (builder) => {
    builder
      // ======== SIGNUP ==========
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      })

      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Signup failed";
      })

      // ======== SIGNIN ==========
      .addCase(signin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(signin.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.payload.user;
      })

      .addCase(signin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Signin failed";
      })

      // ======== LOGOUT ==========
      .addCase(logout.pending, (state) => {
        state.loading = true;
      })

      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.initialized = true;
        state.user = null;
        state.error = null;
      })

      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // ======== GET USER PROFILE ==========

      .addCase(getUserProfile.pending, (state) => {
        state.loading = true;
      })

      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.initialized = true;
        state.user = action.payload;
      })

      .addCase(getUserProfile.rejected, (state) => {
        state.loading = false;
        state.initialized = true;
        state.user = null;
      });
  },
});

export const { clearAuth } = authSlice.actions;

export default authSlice.reducer;
