import mongoose, { Schema, model } from "mongoose";

import type { HydratedDocument, Model, Types } from "mongoose";

import { PaymentStatus } from "../enums/paymentStatus.enum.js";

export interface ISubscriptionPayment {
  store: Types.ObjectId;

  subscriptionPlan: Types.ObjectId;

  amount: number;

  status: PaymentStatus;

  razorpayOrderId: string;

  razorpayPaymentId?: string;

  razorpaySignature?: string;

  paidAt?: Date;

  createdAt?: Date;

  updatedAt?: Date;
}

export type SubscriptionPaymentDocument = HydratedDocument<ISubscriptionPayment>;

const subscriptionPaymentSchema = new Schema<ISubscriptionPayment>(
  {
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

    amount: {
      type: Number,
      required: true,
      min: 0,
    },

    status: {
      type: String,
      enum: Object.values(PaymentStatus),
      default: PaymentStatus.PENDING,
    },

    razorpayOrderId: {
      type: String,
      required: true,
    },

    razorpayPaymentId: {
      type: String,
    },

    razorpaySignature: {
      type: String,
    },

    paidAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const SubscriptionPayment: Model<ISubscriptionPayment> = model<ISubscriptionPayment>(
  "SubscriptionPayment",
  subscriptionPaymentSchema
);

export default SubscriptionPayment;
