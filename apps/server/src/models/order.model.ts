import mongoose, { Schema, Types, model } from "mongoose";
import type { HydratedDocument, Model } from "mongoose";

import { PaymentType } from "../enums/paymentType.enums.js";
import { OrderStatus } from "../enums/orderStatus.enums.js";

export interface IOrderItem {
  product: Types.ObjectId;
  quantity: number;
  price: number;
}

export interface IOrder {
  totalAmount: number;
  branch: Types.ObjectId;
  cashier: Types.ObjectId;
  customer: Types.ObjectId;
  paymentType: PaymentType;
  status: OrderStatus;
  items: IOrderItem[];
  createdAt?: Date;
  updatedAt?: Date;
}

export type OrderDocument = HydratedDocument<IOrder>;

const orderItemSchema = new Schema<IOrderItem>(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
      min: 1,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    _id: false, // Prevents creation of _id for sub-documents
  }
);

const orderSchema = new Schema<IOrder>(
  {
    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },

    branch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branch",
      required: true,
    },

    cashier: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },

    paymentType: {
      type: String,
      enum: Object.values(PaymentType),
      required: true,
    },

    status: {
      type: String,
      enum: Object.values(OrderStatus),
      default: OrderStatus.COMPLETED,
    },
    items: {
      type: [orderItemSchema],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Order: Model<IOrder> = model<IOrder>("Order", orderSchema);

export default Order;
