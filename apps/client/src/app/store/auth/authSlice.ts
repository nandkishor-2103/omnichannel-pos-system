import { createSlice } from "@reduxjs/toolkit";
import { signin, signup } from "./authThunk";
import type { AuthState } from "./authTypes";

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    logout: (state) => {
      state.user = null;
      state.error = null;
      state.loading = false;
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
        state.user = action.payload.user;
      })

      .addCase(signin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Signin failed";
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
