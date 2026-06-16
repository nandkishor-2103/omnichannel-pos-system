import SubscriptionInvoice from "../models/subscriptionInvoice.model.js";
import SubscriptionPayment from "../models/subscriptionPayment.model.js";
import User from "../models/user.model.js";

import { InvoiceStatus } from "../enums/invoiceStatus.enum.js";

import { generateInvoiceNumber } from "../utils/generateInvoiceNumber.js";

import { sendMail } from "../services/mail.service.js";

import ApiError from "../utils/ApiError.js";

// ==================================================
// CREATE INVOICE FOR A PAYMENT
// ==================================================
export const createSubscriptionInvoiceService = async (paymentId: string) => {
  const payment = await SubscriptionPayment.findById(paymentId)
    .populate("store", "brand")
    .populate("subscriptionPlan", "name billingCycle price");

  if (!payment) {
    throw new ApiError({
      statusCode: 404,
      message: "Payment not found",
    });
  }

  const adminUser = await User.findOne({
    store: payment.store,
    role: "ROLE_STORE_ADMIN",
  });

  if (!adminUser) {
    throw new ApiError({
      statusCode: 404,
      message: "Store admin not found",
    });
  }

  const store = payment.store as unknown as {
    _id: string;
    brand: string;
  };

  const plan = payment.subscriptionPlan as unknown as {
    _id: string;
    name: string;
    billingCycle: "MONTHLY" | "YEARLY";
    price: number;
  };

  const subtotal = payment.amount;

  const taxAmount = 0;

  const totalAmount = subtotal + taxAmount;

  const invoice = await SubscriptionInvoice.create({
    invoiceNumber: generateInvoiceNumber(),

    store: store._id,

    subscriptionPlan: plan._id,

    payment: payment._id,

    // Snapshot Fields

    storeName: store.brand,

    customerName: adminUser.fullName,

    customerEmail: adminUser.email,

    planName: plan.name,

    billingCycle: plan.billingCycle,

    subtotal,

    taxAmount,

    totalAmount,

    amount: payment.amount,

    status: InvoiceStatus.GENERATED,

    issuedAt: new Date(),
  });

  try {
    if (adminUser.email) {
      await sendMail({
        to: adminUser.email,

        subject: `Invoice ${invoice.invoiceNumber}`,

        html: `
          <h2>Subscription Payment Successful</h2>

          <p><strong>Invoice Number:</strong> ${invoice.invoiceNumber}</p>

          <p><strong>Store:</strong> ${invoice.storeName}</p>

          <p><strong>Plan:</strong> ${invoice.planName}</p>

          <p><strong>Billing Cycle:</strong> ${invoice.billingCycle}</p>

          <p><strong>Total Amount:</strong> ₹${invoice.totalAmount}</p>

          <p>Thank you for choosing our POS platform.</p>
        `,
      });

      invoice.status = InvoiceStatus.SENT;

      invoice.emailedAt = new Date();

      await invoice.save();
    }
  } catch (error) {
    invoice.status = InvoiceStatus.FAILED;

    await invoice.save();
  }

  return invoice;
};

// ==================================================
// GET INVOICES FOR A STORE
// ==================================================
export const getSubscriptionInvoicesService = async (storeId: string) => {
  return SubscriptionInvoice.find({
    store: storeId,
  }).sort({
    createdAt: -1,
  });
};

// ==================================================
// GET INVOICE BY ID
// ==================================================
export const getSubscriptionInvoiceByIdService = async (
  invoiceId: string,
  storeId: string
) => {
  return SubscriptionInvoice.findOne({
    _id: invoiceId,
    store: storeId,
  });
};

// ==================================================
// RESEND INVOICE
// ==================================================
export const resendSubscriptionInvoiceService = async (
  invoiceId: string,
  storeId: string
) => {
  const invoice = await SubscriptionInvoice.findOne({
    _id: invoiceId,
    store: storeId,
  });

  if (!invoice) {
    throw new ApiError({
      statusCode: 404,
      message: "Invoice not found",
    });
  }

  await sendMail({
    to: invoice.customerEmail,

    subject: `Invoice ${invoice.invoiceNumber}`,

    html: `
      <h2>Subscription Invoice</h2>

      <p><strong>Invoice Number:</strong> ${invoice.invoiceNumber}</p>

      <p><strong>Store:</strong> ${invoice.storeName}</p>

      <p><strong>Plan:</strong> ${invoice.planName}</p>

      <p><strong>Billing Cycle:</strong> ${invoice.billingCycle}</p>

      <p><strong>Total Amount:</strong> ₹${invoice.totalAmount}</p>

      <p>Thank you for choosing our POS platform.</p>
    `,
  });

  invoice.emailedAt = new Date();

  invoice.status = InvoiceStatus.SENT;

  await invoice.save();

  return invoice;
};

// ==================================================
// GET INVOICE FOR DOWNLOAD
// ==================================================
export const getSubscriptionInvoiceForDownloadService = async (
  invoiceId: string,
  storeId: string
) => {
  return SubscriptionInvoice.findOne({
    _id: invoiceId,
    store: storeId,
  });
};
