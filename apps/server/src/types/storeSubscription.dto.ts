export interface StoreSubscriptionResponseDto {
  _id: string;

  store: string;

  subscriptionPlan: string;

  startDate: Date;

  endDate: Date;

  status: "ACTIVE" | "EXPIRED" | "CANCELLED";

  createdAt?: Date;

  updatedAt?: Date;
}

export interface CurrentStoreSubscriptionResponseDto {
  _id: string;

  store: string;

  startDate: Date;

  endDate: Date;

  status: "ACTIVE" | "EXPIRED" | "CANCELLED";

  subscriptionPlan: {
    _id: string;
    name: string;
  };
}
