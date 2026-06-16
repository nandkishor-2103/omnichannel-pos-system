import type { RootState } from "../../store";

export const selectSubscriptionPlans = (state: RootState) => state.subscriptionPlan.plans;

export const selectSubscriptionPlanLoading = (state: RootState) =>
  state.subscriptionPlan.loading;

export const selectSubscriptionPlanError = (state: RootState) =>
  state.subscriptionPlan.error;

export const selectSelectedSubscriptionPlan = (state: RootState) =>
  state.subscriptionPlan.selectedPlan;
