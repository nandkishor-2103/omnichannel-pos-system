import { createAsyncThunk } from "@reduxjs/toolkit";

import { api, getErrorMessage } from "@/lib/axios";

import type {
  SubscriptionInvoiceResponse,
  SubscriptionInvoicesResponse,
} from "./subscriptionInvoiceTypes";

// ==========================================
// GET ALL INVOICES
// ==========================================

export const getSubscriptionInvoices = createAsyncThunk<
  SubscriptionInvoicesResponse,
  void,
  { rejectValue: string }
>("subscriptionInvoice/getAll", async (_, { rejectWithValue }) => {
  try {
    const res = await api.get<SubscriptionInvoicesResponse>("/subscription-invoices");

    return res.data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

// ==========================================
// GET INVOICE BY ID
// ==========================================

export const getSubscriptionInvoiceById = createAsyncThunk<
  SubscriptionInvoiceResponse,
  string,
  { rejectValue: string }
>("subscriptionInvoice/getById", async (invoiceId, { rejectWithValue }) => {
  try {
    const res = await api.get<SubscriptionInvoiceResponse>(
      `/subscription-invoices/${invoiceId}`
    );

    return res.data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

// ==========================================
// RESEND INVOICE
// ==========================================

export const resendSubscriptionInvoice = createAsyncThunk<
  SubscriptionInvoiceResponse,
  string,
  { rejectValue: string }
>("subscriptionInvoice/resend", async (invoiceId, { rejectWithValue }) => {
  try {
    const res = await api.post<SubscriptionInvoiceResponse>(
      `/subscription-invoices/${invoiceId}/resend`
    );

    return res.data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

// ==========================================
// DOWNLOAD INVOICE
// ==========================================

export const downloadSubscriptionInvoice = createAsyncThunk<
  Blob,
  string,
  { rejectValue: string }
>("subscriptionInvoice/download", async (invoiceId, { rejectWithValue }) => {
  try {
    const res = await api.get<Blob>(`/subscription-invoices/${invoiceId}/download`, {
      responseType: "blob",
    });

    return res.data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});
