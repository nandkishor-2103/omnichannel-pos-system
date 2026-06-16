import { createAsyncThunk } from "@reduxjs/toolkit";

import { api, getErrorMessage } from "@/lib/axios";

import type {
  CurrentSubscriptionResponse,
  SubscriptionHistoryResponse,
} from "./storeSubscriptionTypes";

// ==========================================
// GET CURRENT SUBSCRIPTION
// ==========================================

export const getCurrentSubscription = createAsyncThunk<
  CurrentSubscriptionResponse,
  void,
  { rejectValue: string }
>("storeSubscription/getCurrent", async (_, { rejectWithValue }) => {
  try {
    const res = await api.get<CurrentSubscriptionResponse>(
      "/store-subscriptions/current"
    );

    return res.data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

// ==========================================
// GET SUBSCRIPTION HISTORY
// ==========================================

export const getMySubscriptions = createAsyncThunk<
  SubscriptionHistoryResponse,
  void,
  { rejectValue: string }
>("storeSubscription/getMySubscriptions", async (_, { rejectWithValue }) => {
  try {
    const res = await api.get<SubscriptionHistoryResponse>(
      "/store-subscriptions/my-subscriptions"
    );

    return res.data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});
