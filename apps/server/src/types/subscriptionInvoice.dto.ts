export interface SubscriptionInvoiceResponseDto {
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

  issuedAt: Date;

  emailedAt?: Date;

  createdAt?: Date;

  updatedAt?: Date;
}
