import mongoose from "mongoose";
import type { Model, HydratedDocument } from "mongoose";

export interface IInventory {
  branch: mongoose.Types.ObjectId;

  product: mongoose.Types.ObjectId;

  quantity: number;

  lastUpdated?: Date;

  createdAt?: Date;

  updatedAt?: Date;
}

export type InventoryDocument = HydratedDocument<IInventory>;

const inventorySchema = new mongoose.Schema<IInventory>(
  {
    branch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branch",
      required: true,
    },

    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
      min: 0,
    },

    lastUpdated: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

inventorySchema.pre("save", function () {
  this.lastUpdated = new Date();
});

const Inventory: Model<IInventory> = mongoose.model<IInventory>(
  "Inventory",
  inventorySchema
);

export { Inventory };
