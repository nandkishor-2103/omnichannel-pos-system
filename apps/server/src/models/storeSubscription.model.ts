import mongoose, { Schema, model } from "mongoose";

import type { HydratedDocument, Model, Types } from "mongoose";

import { SubscriptionStatus } from "../enums/subscriptionStatus.enum.js";

export interface IStoreSubscription {
  store: Types.ObjectId;

  subscriptionPlan: Types.ObjectId;

  startDate: Date;

  endDate: Date;

  status: SubscriptionStatus;

  createdAt?: Date;

  updatedAt?: Date;
}

export type StoreSubscriptionDocument = HydratedDocument<IStoreSubscription>;

const storeSubscriptionSchema = new Schema<IStoreSubscription>(
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

    startDate: {
      type: Date,
      required: true,
    },

    endDate: {
      type: Date,
      required: true,
    },

    status: {
      type: String,
      enum: Object.values(SubscriptionStatus),
      default: SubscriptionStatus.ACTIVE,
    },
  },
  {
    timestamps: true,
  }
);

const StoreSubscription: Model<IStoreSubscription> = model<IStoreSubscription>(
  "StoreSubscription",
  storeSubscriptionSchema
);

export default StoreSubscription;
