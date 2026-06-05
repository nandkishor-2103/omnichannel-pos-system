import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "@/lib/axios";

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
    const res = await api.post<BranchResponse>("/branches", dto);

    console.log("Create branch success:", res.data);

    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data?.message ?? "Create branch failed");
    }

    return rejectWithValue("Something went wrong");
  }
});

// Get Branch by ID
export const getBranchById = createAsyncThunk<
  BranchResponse,
  string,
  { rejectValue: string }
>("branch/getById", async (id, { rejectWithValue }) => {
  try {
    const res = await api.get<BranchResponse>(`/branches/${id}`);

    // console.log("Get branch success:", res.data);

    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data?.message ?? "Branch not found");
    }

    return rejectWithValue("Something went wrong");
  }
});

// Get All Branches By Store
export const getAllBranchesByStore = createAsyncThunk<
  BranchesResponse,
  string,
  { rejectValue: string }
>("branch/getAllByStore", async (storeId, { rejectWithValue }) => {
  try {
    const res = await api.get<BranchesResponse>(`/branches/store/${storeId}`);

    console.log("Get branches success:", res.data);

    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data?.message ?? "Failed to fetch branches");
    }

    return rejectWithValue("Something went wrong");
  }
});

// Update Branch
export const updateBranch = createAsyncThunk<
  BranchResponse,
  UpdateBranchPayload,
  { rejectValue: string }
>("branch/update", async ({ id, dto }, { rejectWithValue }) => {
  try {
    const res = await api.put<BranchResponse>(`/branches/${id}`, dto);

    console.log("Update branch success:", res.data);

    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data?.message ?? "Update failed");
    }

    return rejectWithValue("Something went wrong");
  }
});

// Delete Branch
export const deleteBranch = createAsyncThunk<string, string, { rejectValue: string }>(
  "branch/delete",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/branches/${id}`);

      console.log("Delete branch success:", id);

      return id;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message ?? "Delete failed");
      }

      return rejectWithValue("Something went wrong");
    }
  }
);
