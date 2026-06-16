import { createSlice } from "@reduxjs/toolkit";

import type { StoreSubscriptionState } from "./storeSubscriptionTypes";

import { getCurrentSubscription, getMySubscriptions } from "./storeSubscriptionThunk";

const initialState: StoreSubscriptionState = {
  currentSubscription: null,

  subscriptions: [],

  loadingCurrent: false,

  loadingHistory: false,

  error: null,
};

const storeSubscriptionSlice = createSlice({
  name: "storeSubscription",

  initialState,

  reducers: {
    clearStoreSubscriptionError: (state) => {
      state.error = null;
    },

    clearCurrentSubscription: (state) => {
      state.currentSubscription = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // ==========================================
      // GET CURRENT SUBSCRIPTION
      // ==========================================

      .addCase(getCurrentSubscription.pending, (state) => {
        state.loadingCurrent = true;
        state.error = null;
      })

      .addCase(getCurrentSubscription.fulfilled, (state, action) => {
        state.loadingCurrent = false;

        state.currentSubscription = action.payload.payload.subscription;
      })

      .addCase(getCurrentSubscription.rejected, (state, action) => {
        state.loadingCurrent = false;

        state.error = action.payload ?? "Failed to fetch current subscription";
      })

      // ==========================================
      // GET SUBSCRIPTION HISTORY
      // ==========================================

      .addCase(getMySubscriptions.pending, (state) => {
        state.loadingHistory = true;
        state.error = null;
      })

      .addCase(getMySubscriptions.fulfilled, (state, action) => {
        state.loadingHistory = false;

        state.subscriptions = action.payload.payload.subscriptions;
      })

      .addCase(getMySubscriptions.rejected, (state, action) => {
        state.loadingHistory = false;

        state.error = action.payload ?? "Failed to fetch subscription history";
      });
  },
});

export const { clearStoreSubscriptionError, clearCurrentSubscription } =
  storeSubscriptionSlice.actions;

export default storeSubscriptionSlice.reducer;
