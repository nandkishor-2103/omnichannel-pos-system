export interface SubscriptionPlan {
  _id: string;
  name: string;
  description?: string;
  price: number;
  duration: number;
  features?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface SubscriptionPlanResponse {
  plan: SubscriptionPlan;
  message?: string;
}

export interface SubscriptionPlansResponse {
  plans: SubscriptionPlan[];
  message?: string;
}

export interface CreateSubscriptionPlanPayload {
  name: string;
  description?: string;
  price: number;
  duration: number;
  features?: string[];
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
