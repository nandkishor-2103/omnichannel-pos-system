export interface SubscriptionInvoice {
  _id: string;

  invoiceNumber: string;

  store: string;

  subscriptionPlan: string;

  payment: string;

  storeName: string;

  customerName: string;

  customerEmail: string;

  planName: string;

  billingCycle: "MONTHLY" | "YEARLY";

  subtotal: number;

  taxAmount: number;

  totalAmount: number;

  amount: number;

  status: "GENERATED" | "SENT" | "FAILED";

  issuedAt: string;

  emailedAt?: string;

  createdAt?: string;

  updatedAt?: string;
}

export interface SubscriptionInvoiceResponse {
  statusCode: number;

  message: string;

  payload: {
    invoice: SubscriptionInvoice;
  };
}

export interface SubscriptionInvoicesResponse {
  statusCode: number;

  message: string;

  payload: {
    invoices: SubscriptionInvoice[];
  };
}

export interface SubscriptionInvoiceState {
  invoices: SubscriptionInvoice[];

  selectedInvoice: SubscriptionInvoice | null;

  loading: boolean;

  error: string | null;
}
