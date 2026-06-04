import { createSlice } from "@reduxjs/toolkit";

import {
  createBranch,
  getBranchById,
  getAllBranchesByStore,
  updateBranch,
  deleteBranch,
} from "./branchThunk";

import type { BranchState } from "./branchTypes";

const initialState: BranchState = {
  branch: null,
  branches: [],
  employees: [],
  loading: false,
  error: null,
};

const branchSlice = createSlice({
  name: "branch",
  initialState,

  reducers: {
    clearBranchState: (state) => {
      state.branch = null;
      state.branches = [];
      state.employees = [];
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // CREATE
      .addCase(createBranch.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBranch.fulfilled, (state, action) => {
        state.loading = false;

        state.branch = action.payload.branch;
        state.branches.push(action.payload.branch);
      })
      .addCase(createBranch.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Create branch failed";
      })

      // GET BY ID
      .addCase(getBranchById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBranchById.fulfilled, (state, action) => {
        state.loading = false;
        state.branch = action.payload.branch;
      })
      .addCase(getBranchById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Branch not found";
      })

      // GET ALL
      .addCase(getAllBranchesByStore.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllBranchesByStore.fulfilled, (state, action) => {
        state.loading = false;
        state.branches = action.payload.branches;
      })
      .addCase(getAllBranchesByStore.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to fetch branches";
      })

      // UPDATE
      .addCase(updateBranch.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateBranch.fulfilled, (state, action) => {
        state.loading = false;

        const updatedBranch = action.payload.branch;

        state.branch = updatedBranch;

        const index = state.branches.findIndex(
          (branch) => branch._id === updatedBranch._id
        );

        if (index !== -1) {
          state.branches[index] = updatedBranch;
        }
      })
      .addCase(updateBranch.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Update failed";
      })

      // DELETE
      .addCase(deleteBranch.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteBranch.fulfilled, (state, action) => {
        state.loading = false;

        state.branches = state.branches.filter((branch) => branch._id !== action.payload);

        if (state.branch?._id === action.payload) {
          state.branch = null;
        }
      })
      .addCase(deleteBranch.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Delete failed";
      });
  },
});

export const { clearBranchState } = branchSlice.actions;

export default branchSlice.reducer;
