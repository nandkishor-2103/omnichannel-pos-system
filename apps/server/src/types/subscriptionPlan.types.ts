export interface SubscriptionPlanResponseDto {
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

  status: "ACTIVE" | "INACTIVE" | "DELETED";

  createdAt?: Date;

  updatedAt?: Date;
}

export interface CreateSubscriptionPlanDto {
  name: string;

  description?: string;

  price: number;

  billingCycle: "MONTHLY" | "YEARLY";

  maxBranches: number;

  maxUsers: number;

  maxProducts: number;

  enableAdvancedReports?: boolean;

  enableInventory?: boolean;

  enableIntegrations?: boolean;

  enableEcommerce?: boolean;

  enableInvoiceBranding?: boolean;

  prioritySupport?: boolean;

  enableMultiLocation?: boolean;

  extraFeatures?: string[];
}

export interface UpdateSubscriptionPlanDto extends Partial<CreateSubscriptionPlanDto> {}
