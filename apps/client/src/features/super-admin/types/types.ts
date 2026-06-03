export interface PlanFormValues {
  name: string;
  description: string;
  price: string | number;
  billingCycle: string;
  maxBranches: string | number;
  maxUsers: string | number;
  maxProducts: string | number;

  enableAdvancedReports: boolean;
  enableInventory: boolean;
  enableIntegrations: boolean;
  enableEcommerce: boolean;
  enableInvoiceBranding: boolean;
  prioritySupport: boolean;
  enableMultiLocation: boolean;

  extraFeatures: string[];
}

export interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}
