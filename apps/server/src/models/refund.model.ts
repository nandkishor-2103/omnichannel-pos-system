import mongoose, { Schema, Types, model } from "mongoose";
import type { HydratedDocument, Model } from "mongoose";

import { PaymentType } from "../enums/paymentType.enums.js";

export interface IRefund {
  order: Types.ObjectId;
  reason: string;
  amount: number;

  /**
   * Future Integration:
   * ShiftReport APIs will be implemented later.
   * Keep this relationship intact.
   */
  shiftReport?: Types.ObjectId;

  cashier: Types.ObjectId;
  branch: Types.ObjectId;

  paymentType: PaymentType;

  razorpayRefundId?: string;

  createdAt?: Date;
  updatedAt?: Date;
}

export type RefundDocument = HydratedDocument<IRefund>;

const refundSchema = new Schema<IRefund>(
  {
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },

    reason: {
      type: String,
      required: true,
      trim: true,
      maxLength: 500,
    },

    amount: {
      type: Number,
      required: true,
      min: 0,
    },

    shiftReport: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ShiftReport",
      required: false,
    },

    cashier: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    branch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branch",
      required: true,
    },

    paymentType: {
      type: String,
      enum: Object.values(PaymentType),
      required: true,
    },

    razorpayRefundId: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Refund: Model<IRefund> = model<IRefund>("Refund", refundSchema);

export default Refund;
