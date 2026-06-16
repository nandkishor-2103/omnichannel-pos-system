export interface StoreSubscription {
  _id: string;

  store: string;

  subscriptionPlan: {
    _id: string;
    name: string;
    price: number;
    billingCycle: "MONTHLY" | "YEARLY";
  };

  startDate: string;

  endDate: string;

  status: "ACTIVE" | "EXPIRED" | "CANCELLED";

  createdAt?: string;

  updatedAt?: string;
}

export interface CurrentSubscriptionResponse {
  statusCode: number;

  message: string;

  payload: {
    subscription: StoreSubscription | null;
  };
}

export interface SubscriptionHistoryResponse {
  statusCode: number;

  message: string;

  payload: {
    subscriptions: StoreSubscription[];
  };
}

export interface CreateSubscriptionPaymentResponse {
  statusCode: number;

  success: boolean;

  message: string;

  payload: {
    orderId: string;

    amount: number;

    currency: string;

    key: string;

    plan: {
      _id: string;

      name: string;

      description: string;

      price: number;

      billingCycle: "MONTHLY" | "YEARLY";
    };
  };
}

export interface StoreSubscriptionState {
  currentSubscription: StoreSubscription | null;

  subscriptions: StoreSubscription[];

  loadingCurrent: boolean;

  loadingHistory: boolean;

  error: string | null;
}
