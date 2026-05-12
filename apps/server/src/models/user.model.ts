import mongoose, { Document, Model } from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser extends Document {
  fullName: string;
  email: string;
  password: string;
  phone: string;
  store?: mongoose.Types.ObjectId;
  branch?: mongoose.Types.ObjectId;
  role:
    | "ROLE_ADMIN"
    | "ROLE_STORE_ADMIN"
    | "ROLE_STORE_MANAGER"
    | "ROLE_BRANCH_MANAGER"
    | "ROLE_BRANCH_ADMIN"
    | "ROLE_BRANCH_CASHIER"
    | "ROLE_CUSTOMER";

  verified: boolean;
  lastLogin?: Date;

  comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      select: false,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    store: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Store",
    },

    branch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branch",
    },

    role: {
      type: String,
      enum: [
        "ROLE_ADMIN",
        "ROLE_STORE_ADMIN",
        "ROLE_STORE_MANAGER",
        "ROLE_BRANCH_MANAGER",
        "ROLE_BRANCH_ADMIN",
        "ROLE_BRANCH_CASHIER",
        "ROLE_CUSTOMER",
      ],
      required: true,
    },

    verified: {
      type: Boolean,
      default: false,
    },

    lastLogin: {
      type: Date,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
});

userSchema.methods.comparePassword = async function (candidatePassword: string) {
  return bcrypt.compare(candidatePassword, this.password);
};

const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);

export default User;
