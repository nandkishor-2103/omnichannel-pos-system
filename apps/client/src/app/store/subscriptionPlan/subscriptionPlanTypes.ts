export interface SubscriptionPlan {
  _id: string;

  name: string;

  description?: string;

  price: number;

  billingCycle: "MONTHLY" | "YEARLY";

  maxBranches: number;

  maxUsers: number;

  maxProducts: number;

  enableAdvancedReports: boolean;

  enableInventory: boolean;

  enableIntegrations: boolean;

  enableEcommerce: boolean;

  enableInvoiceBranding: boolean;

  prioritySupport: boolean;

  enableMultiLocation: boolean;

  extraFeatures: string[];

  status: "ACTIVE" | "INACTIVE";

  createdAt?: string;

  updatedAt?: string;
}

export interface SubscriptionPlanResponse {
  statusCode: number;

  success: boolean;

  message: string;

  payload: {
    plan: SubscriptionPlan;
  };
}

export interface SubscriptionPlansResponse {
  statusCode: number;

  success: boolean;

  message: string;

  payload: {
    plans: SubscriptionPlan[];
  };
}

export interface CreateSubscriptionPlanPayload {
  name: string;

  description?: string;

  price: number;

  billingCycle: "MONTHLY" | "YEARLY";

  maxBranches: number;

  maxUsers: number;

  maxProducts: number;

  enableAdvancedReports: boolean;

  enableInventory: boolean;

  enableIntegrations: boolean;

  enableEcommerce: boolean;

  enableInvoiceBranding: boolean;

  prioritySupport: boolean;

  enableMultiLocation: boolean;

  extraFeatures: string[];
}

export interface UpdateSubscriptionPlanPayload {
  id: string;

  plan: Partial<CreateSubscriptionPlanPayload>;
}

export interface SubscriptionPlanState {
  plans: SubscriptionPlan[];

  selectedPlan: SubscriptionPlan | null;

  loading: boolean;

  error: string | null;
}
