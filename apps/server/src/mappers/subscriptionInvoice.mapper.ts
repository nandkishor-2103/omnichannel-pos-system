import type { SubscriptionInvoiceDocument } from "../models/subscriptionInvoice.model.js";

import type { SubscriptionInvoiceResponseDto } from "../types/subscriptionInvoice.dto.js";

export const mapSubscriptionInvoiceToResponseDto = (
  invoice: SubscriptionInvoiceDocument
): SubscriptionInvoiceResponseDto => {
  return {
    _id: invoice._id.toString(),

    invoiceNumber: invoice.invoiceNumber,

    store: invoice.store.toString(),

    subscriptionPlan: invoice.subscriptionPlan.toString(),

    payment: invoice.payment.toString(),

    storeName: invoice.storeName,

    customerName: invoice.customerName,

    customerEmail: invoice.customerEmail,

    planName: invoice.planName,

    billingCycle: invoice.billingCycle,

    subtotal: invoice.subtotal,

    taxAmount: invoice.taxAmount,

    totalAmount: invoice.totalAmount,

    amount: invoice.amount,

    status: invoice.status,

    issuedAt: invoice.issuedAt,

    ...(invoice.emailedAt && {
      emailedAt: invoice.emailedAt,
    }),

    ...(invoice.createdAt && {
      createdAt: invoice.createdAt,
    }),

    ...(invoice.updatedAt && {
      updatedAt: invoice.updatedAt,
    }),
  };
};
