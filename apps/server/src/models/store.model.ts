import mongoose, { Model, Schema } from "mongoose";
import type { HydratedDocument } from "mongoose";

export interface IStoreContact {
  address?: string;
  phone?: string;
  email?: string;
}

export interface IStore {
  brand: string;

  storeAdmin: mongoose.Types.ObjectId;

  description?: string;

  storeType?: string;

  status: "ACTIVE" | "PENDING" | "BLOCKED";

  contact?: IStoreContact;

  createdAt?: Date;
  updatedAt?: Date;
}

// Store Document Type
export type StoreDocument = HydratedDocument<IStore>;

const storeContactSchema = new Schema<IStoreContact>(
  {
    address: {
      type: String,
      trim: true,
    },

    phone: {
      type: String,
      trim: true,
    },

    email: {
      type: String,
      trim: true,
      lowercase: true,
    },
  },
  {
    _id: false,
  }
);

const storeSchema = new Schema<IStore>(
  {
    brand: {
      type: String,
      required: true,
      trim: true,
    },

    storeAdmin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    description: {
      type: String,
      trim: true,
    },

    storeType: {
      type: String,
      trim: true,
    },

    status: {
      type: String,

      enum: ["ACTIVE", "PENDING", "BLOCKED"],

      default: "PENDING",
    },

    contact: storeContactSchema,
  },
  {
    timestamps: true,
  }
);

const Store: Model<IStore> = mongoose.model<IStore>("Store", storeSchema);

export default Store;
