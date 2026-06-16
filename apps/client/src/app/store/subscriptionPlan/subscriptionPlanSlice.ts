import { createSlice } from "@reduxjs/toolkit";

import type { SubscriptionPlanState } from "./subscriptionPlanTypes";

import {
  createSubscriptionPlan,
  updateSubscriptionPlan,
  getAllSubscriptionPlans,
  getSubscriptionPlanById,
  deleteSubscriptionPlan,
  activateSubscriptionPlan,
  deactivateSubscriptionPlan,
} from "./subscriptionPlanThunk";

const initialState: SubscriptionPlanState = {
  plans: [],
  selectedPlan: null,
  loading: false,
  error: null,
};

const subscriptionPlanSlice = createSlice({
  name: "subscriptionPlan",

  initialState,

  reducers: {
    clearSelectedPlan: (state) => {
      state.selectedPlan = null;
    },

    clearError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // ================= CREATE =================

      .addCase(createSubscriptionPlan.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(createSubscriptionPlan.fulfilled, (state, action) => {
        state.loading = false;

        state.plans.push(action.payload.payload.plan);
      })

      .addCase(createSubscriptionPlan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to create subscription plan";
      })

      // ================= UPDATE =================

      .addCase(updateSubscriptionPlan.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(updateSubscriptionPlan.fulfilled, (state, action) => {
        state.loading = false;

        const updatedPlan = action.payload.payload.plan;

        const index = state.plans.findIndex((plan) => plan._id === updatedPlan._id);

        if (index !== -1) {
          state.plans[index] = updatedPlan;
        }

        if (state.selectedPlan && state.selectedPlan._id === updatedPlan._id) {
          state.selectedPlan = updatedPlan;
        }
      })

      .addCase(updateSubscriptionPlan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to update subscription plan";
      })

      // ================= GET ALL =================

      .addCase(getAllSubscriptionPlans.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getAllSubscriptionPlans.fulfilled, (state, action) => {
        state.loading = false;

        state.plans = action.payload.payload.plans;
      })

      .addCase(getAllSubscriptionPlans.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to fetch plans";
      })

      // ================= GET BY ID =================

      .addCase(getSubscriptionPlanById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getSubscriptionPlanById.fulfilled, (state, action) => {
        state.loading = false;

        state.selectedPlan = action.payload.payload.plan;
      })

      .addCase(getSubscriptionPlanById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to fetch plan";
      })

      // ================= DELETE =================

      .addCase(deleteSubscriptionPlan.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(deleteSubscriptionPlan.fulfilled, (state, action) => {
        state.loading = false;

        state.plans = state.plans.filter((plan) => plan._id !== action.payload);

        if (state.selectedPlan && state.selectedPlan._id === action.payload) {
          state.selectedPlan = null;
        }
      })

      .addCase(deleteSubscriptionPlan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to delete plan";
      })

      // ================= ACTIVATE =================

      .addCase(activateSubscriptionPlan.fulfilled, (state, action) => {
        const updatedPlan = action.payload.payload.plan;

        state.plans = state.plans.map((plan) =>
          plan._id === updatedPlan._id ? updatedPlan : plan
        );

        if (state.selectedPlan?._id === updatedPlan._id) {
          state.selectedPlan = updatedPlan;
        }
      })

      // ================= DEACTIVATE =================

      .addCase(deactivateSubscriptionPlan.fulfilled, (state, action) => {
        const updatedPlan = action.payload.payload.plan;

        state.plans = state.plans.map((plan) =>
          plan._id === updatedPlan._id ? updatedPlan : plan
        );

        if (state.selectedPlan?._id === updatedPlan._id) {
          state.selectedPlan = updatedPlan;
        }
      });
  },
});

export const { clearSelectedPlan, clearError } = subscriptionPlanSlice.actions;

export default subscriptionPlanSlice.reducer;
