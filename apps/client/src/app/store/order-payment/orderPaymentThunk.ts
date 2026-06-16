import { createAsyncThunk } from "@reduxjs/toolkit";

import { api, getErrorMessage } from "@/lib/axios";

import type {
  CreateOrderPaymentRequest,
  CreateOrderPaymentResponse,
  VerifyOrderPaymentRequest,
  VerifyOrderPaymentResponse,
} from "./orderPaymentTypes";

export const createOrderPaymentOrder = createAsyncThunk<
  CreateOrderPaymentResponse,
  CreateOrderPaymentRequest,
  { rejectValue: string }
>("orderPayment/createOrder", async (payload, { rejectWithValue }) => {
  try {
    const res = await api.post<CreateOrderPaymentResponse>(
      "/order-payments/create-order",
      payload
    );

    return res.data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

export const verifyOrderPayment = createAsyncThunk<
  VerifyOrderPaymentResponse,
  VerifyOrderPaymentRequest,
  { rejectValue: string }
>("orderPayment/verify", async (payload, { rejectWithValue }) => {
  try {
    const res = await api.post<VerifyOrderPaymentResponse>(
      "/order-payments/verify",
      payload
    );

    return res.data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});
