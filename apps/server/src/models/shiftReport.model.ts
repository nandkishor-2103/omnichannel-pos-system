import mongoose, { Schema, Types, model } from "mongoose";
import type { HydratedDocument, Model } from "mongoose";

import { ShiftStatus } from "../enums/shiftStatus.enums.js";

interface ShiftBreak {
  pauseAt: Date;
  resumeAt?: Date | null;
}
export interface IShiftReport {
  shiftStart: Date;

  shiftEnd?: Date | null;

  status: ShiftStatus;

  breaks: ShiftBreak[];

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

    status: {
      type: String,
      enum: Object.values(ShiftStatus),
      default: ShiftStatus.ACTIVE,
    },

    breaks: [
      {
        pauseAt: {
          type: Date,
          required: true,
        },

        resumeAt: {
          type: Date,
          default: null,
        },
      },
    ],

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
