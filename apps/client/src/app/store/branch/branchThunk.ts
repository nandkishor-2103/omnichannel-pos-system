import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { api, getErrorMessage } from "@/lib/axios";

import type {
  BranchResponse,
  BranchesResponse,
  CreateBranchPayload,
  UpdateBranchPayload,
} from "./branchTypes";

// Create Branch
export const createBranch = createAsyncThunk<
  BranchResponse,
  CreateBranchPayload,
  { rejectValue: string }
>("branch/create", async (dto, { rejectWithValue }) => {
  try {
    const response = await api.post<BranchResponse>("/branches", dto);

    return response.data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

// Get Branch by ID
export const getBranchById = createAsyncThunk<
  BranchResponse,
  string,
  { rejectValue: string }
>("branch/getById", async (id, { rejectWithValue }) => {
  try {
    const response = await api.get<BranchResponse>(`/branches/${id}`);

    return response.data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

// Get All Branches By Store
export const getAllBranchesByStore = createAsyncThunk<
  BranchesResponse,
  string,
  { rejectValue: string }
>("branch/getAllByStore", async (storeId, { rejectWithValue }) => {
  try {
    const response = await api.get<BranchesResponse>(`/branches/store/${storeId}`);

    return response.data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

// Update Branch
export const updateBranch = createAsyncThunk<
  BranchResponse,
  UpdateBranchPayload,
  { rejectValue: string }
>("branch/update", async ({ id, dto }, { rejectWithValue }) => {
  try {
    const response = await api.put<BranchResponse>(`/branches/${id}`, dto);

    return response.data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

// Delete Branch
export const deleteBranch = createAsyncThunk<string, string, { rejectValue: string }>(
  "branch/delete",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/branches/${id}`);

      return id;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);
