import mongoose from "mongoose";
import { type HydratedDocument, Model } from "mongoose";

export interface ICustomer {
  fullName: string;
  email?: string;
  phone: string;
  branch: mongoose.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

export type CustomerDocument = HydratedDocument<ICustomer>;

const customerSchema = new mongoose.Schema<ICustomer>(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    branch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branch",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Customer: Model<ICustomer> = mongoose.model<ICustomer>("Customer", customerSchema);

export default Customer;