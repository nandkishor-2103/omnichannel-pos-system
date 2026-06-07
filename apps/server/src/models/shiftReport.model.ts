import mongoose, { Schema, Types, model } from "mongoose";
import type { HydratedDocument, Model } from "mongoose";

export interface IShiftReport {
  shiftStart: Date;

  shiftEnd?: Date | null;

  totalSales: number;

  totalRefunds: number;

  netSales: number;

  totalOrders: number;

  cashier: Types.ObjectId;

  branch: Types.ObjectId;

  refunds: Types.ObjectId[];

  createdAt?: Date;
  updatedAt?: Date;
}

export type ShiftReportDocument = HydratedDocument<IShiftReport>;

const shiftReportSchema = new Schema<IShiftReport>(
  {
    shiftStart: {
      type: Date,
      required: true,
    },

    shiftEnd: {
      type: Date,
      default: null,
    },

    totalSales: {
      type: Number,
      default: 0,
      min: 0,
    },

    totalRefunds: {
      type: Number,
      default: 0,
      min: 0,
    },

    netSales: {
      type: Number,
      default: 0,
    },

    totalOrders: {
      type: Number,
      default: 0,
      min: 0,
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

    refunds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Refund",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const ShiftReport: Model<IShiftReport> = model<IShiftReport>(
  "ShiftReport",
  shiftReportSchema
);

export default ShiftReport;
