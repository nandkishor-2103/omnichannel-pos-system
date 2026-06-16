import { createAsyncThunk } from "@reduxjs/toolkit";

import { api, getErrorMessage } from "@/lib/axios";

import type {
  CreateSubscriptionPaymentPayload,
  CreateSubscriptionPaymentResponse,
  VerifySubscriptionPaymentPayload,
  VerifySubscriptionPaymentResponse,
  SubscriptionPaymentHistoryResponse,
} from "./subscriptionPaymentTypes";

// ==========================================
// CREATE PAYMENT ORDER
// ==========================================

export const createSubscriptionPaymentOrder = createAsyncThunk<
  CreateSubscriptionPaymentResponse,
  CreateSubscriptionPaymentPayload,
  { rejectValue: string }
>("subscriptionPayment/createOrder", async (payload, { rejectWithValue }) => {
  try {
    const res = await api.post<CreateSubscriptionPaymentResponse>(
      "/subscription-payments/create-order",
      payload
    );

    return res.data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

// ==========================================
// VERIFY PAYMENT
// ==========================================

export const verifySubscriptionPayment = createAsyncThunk<
  VerifySubscriptionPaymentResponse,
  VerifySubscriptionPaymentPayload,
  { rejectValue: string }
>("subscriptionPayment/verify", async (payload, { rejectWithValue }) => {
  try {
    const res = await api.post<VerifySubscriptionPaymentResponse>(
      "/subscription-payments/verify",
      payload
    );

    return res.data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

// ==========================================
// PAYMENT HISTORY
// ==========================================

export const getSubscriptionPaymentHistory = createAsyncThunk<
  SubscriptionPaymentHistoryResponse,
  void,
  { rejectValue: string }
>("subscriptionPayment/history", async (_, { rejectWithValue }) => {
  try {
    const res = await api.get<SubscriptionPaymentHistoryResponse>(
      "/subscription-payments/history"
    );

    return res.data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});
