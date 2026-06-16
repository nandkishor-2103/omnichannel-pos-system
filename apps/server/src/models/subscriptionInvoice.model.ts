import mongoose, { Schema, model } from "mongoose";

import type { HydratedDocument, Model, Types } from "mongoose";

import { InvoiceStatus } from "../enums/invoiceStatus.enum.js";

export interface ISubscriptionInvoice {
  invoiceNumber: string;

  store: Types.ObjectId;

  subscriptionPlan: Types.ObjectId;

  payment: Types.ObjectId;

  // Snapshot Fields
  storeName: string;

  customerName: string;

  customerEmail: string;

  planName: string;

  billingCycle: "MONTHLY" | "YEARLY";

  subtotal: number;

  taxAmount: number;

  totalAmount: number;

  amount: number;

  status: InvoiceStatus;

  issuedAt: Date;

  emailedAt?: Date;

  createdAt?: Date;

  updatedAt?: Date;
}

export type SubscriptionInvoiceDocument = HydratedDocument<ISubscriptionInvoice>;

const subscriptionInvoiceSchema = new Schema<ISubscriptionInvoice>(
  {
    invoiceNumber: {
      type: String,
      required: true,
      unique: true,
    },

    store: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Store",
      required: true,
    },

    subscriptionPlan: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubscriptionPlan",
      required: true,
    },

    payment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubscriptionPayment",
      required: true,
    },

    // Snapshot Fields

    storeName: {
      type: String,
      required: true,
      trim: true,
    },

    customerName: {
      type: String,
      required: true,
      trim: true,
    },

    customerEmail: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    planName: {
      type: String,
      required: true,
      trim: true,
    },

    billingCycle: {
      type: String,
      enum: ["MONTHLY", "YEARLY"],
      required: true,
    },

    subtotal: {
      type: Number,
      required: true,
      min: 0,
    },

    taxAmount: {
      type: Number,
      default: 0,
      min: 0,
    },

    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },

    amount: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: Object.values(InvoiceStatus),
      default: InvoiceStatus.GENERATED,
    },

    issuedAt: {
      type: Date,
      default: Date.now,
    },

    emailedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const SubscriptionInvoice: Model<ISubscriptionInvoice> = model<ISubscriptionInvoice>(
  "SubscriptionInvoice",
  subscriptionInvoiceSchema
);

export default SubscriptionInvoice;
