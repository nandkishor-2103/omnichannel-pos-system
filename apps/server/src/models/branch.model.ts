import mongoose, { Model, Schema, Types } from "mongoose";
import type { HydratedDocument } from "mongoose";

export type WorkingDay =
  | "MONDAY"
  | "TUESDAY"
  | "WEDNESDAY"
  | "THURSDAY"
  | "FRIDAY"
  | "SATURDAY"
  | "SUNDAY";

export interface IBranch {
  name: string;

  address: string;

  phone: string;

  email: string;

  workingDays: WorkingDay[];

  openTime: string;

  closeTime: string;

  store: Types.ObjectId;

  manager?: Types.ObjectId | null;

  createdAt?: Date;
  updatedAt?: Date;
}

export type BranchDocument = HydratedDocument<IBranch>;

const branchSchema = new Schema<IBranch>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    address: {
      type: String,
      required: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    workingDays: [
      {
        type: String,
        enum: [
          "MONDAY",
          "TUESDAY",
          "WEDNESDAY",
          "THURSDAY",
          "FRIDAY",
          "SATURDAY",
          "SUNDAY",
        ],
      },
    ],

    openTime: {
      type: String,
      required: true,
    },

    closeTime: {
      type: String,
      required: true,
    },

    store: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Store",
      required: true,
    },

    manager: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const Branch: Model<IBranch> = mongoose.model<IBranch>("Branch", branchSchema);

export default Branch;
