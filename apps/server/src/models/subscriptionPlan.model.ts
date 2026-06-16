import mongoose, { Schema, model } from "mongoose";
import type { HydratedDocument } from "mongoose";

export interface ISubscriptionPlan {
  _id: mongoose.Types.ObjectId;

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

export type SubscriptionPlanDocument = HydratedDocument<ISubscriptionPlan>;

const subscriptionPlanSchema = new Schema<ISubscriptionPlan>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },

    description: {
      type: String,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    billingCycle: {
      type: String,
      enum: ["MONTHLY", "YEARLY"],
      required: true,
    },

    maxBranches: {
      type: Number,
      required: true,
      min: 1,
    },

    maxUsers: {
      type: Number,
      required: true,
      min: 1,
    },

    maxProducts: {
      type: Number,
      required: true,
      min: 1,
    },

    enableAdvancedReports: {
      type: Boolean,
      default: false,
    },

    enableInventory: {
      type: Boolean,
      default: false,
    },

    enableIntegrations: {
      type: Boolean,
      default: false,
    },

    enableEcommerce: {
      type: Boolean,
      default: false,
    },

    enableInvoiceBranding: {
      type: Boolean,
      default: false,
    },

    prioritySupport: {
      type: Boolean,
      default: false,
    },

    enableMultiLocation: {
      type: Boolean,
      default: false,
    },

    extraFeatures: {
      type: [String],
      default: [],
    },

    status: {
      type: String,
      enum: ["ACTIVE", "INACTIVE", "DELETED"],
      default: "ACTIVE",
    },
  },
  {
    timestamps: true,
  }
);

const SubscriptionPlan = model<ISubscriptionPlan>(
  "SubscriptionPlan",
  subscriptionPlanSchema
);

export default SubscriptionPlan;
