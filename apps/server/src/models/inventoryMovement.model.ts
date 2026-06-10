import mongoose, { Schema, Document } from "mongoose";

export type InventoryMovementType =
  | "STOCK_IN"
  | "SALE"
  | "REFUND"
  | "DAMAGED"
  | "ADJUSTMENT";

export interface InventoryMovementDocument extends Document {
  inventory: mongoose.Types.ObjectId;

  product: mongoose.Types.ObjectId;

  branch: mongoose.Types.ObjectId;

  type: InventoryMovementType;

  quantity: number;

  previousQuantity: number;

  newQuantity: number;

  performedBy?: mongoose.Types.ObjectId;

  notes?: string;

  createdAt: Date;
  updatedAt: Date;
}

const inventoryMovementSchema = new Schema<InventoryMovementDocument>(
  {
    inventory: {
      type: Schema.Types.ObjectId,
      ref: "Inventory",
      required: true,
    },

    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    branch: {
      type: Schema.Types.ObjectId,
      ref: "Branch",
      required: true,
    },

    type: {
      type: String,
      enum: ["STOCK_IN", "SALE", "REFUND", "DAMAGED", "ADJUSTMENT"],
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
    },

    previousQuantity: {
      type: Number,
      required: true,
    },

    newQuantity: {
      type: Number,
      required: true,
    },

    performedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    notes: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const InventoryMovement = mongoose.model<InventoryMovementDocument>(
  "InventoryMovement",
  inventoryMovementSchema
);

export default InventoryMovement;
