import mongoose, { Schema, model, Document, Types } from "mongoose";
import type { IStore } from "./store.model.js";

export interface ICategory extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;

  store: mongoose.Types.ObjectId | IStore;

  createdAt: Date;
  updatedAt: Date;
}

const categorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    store: {
      type: Schema.Types.ObjectId,
      ref: "Store",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

categorySchema.index(
  {
    name: 1,
    store: 1,
  },
  {
    unique: true,
  }
);

const Category = model<ICategory>("Category", categorySchema);

export { Category };
