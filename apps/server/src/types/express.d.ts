import { Types } from "mongoose";

export {};

declare global {
  namespace Express {
    interface User {
      _id: Types.ObjectId;

      role:
        | "ROLE_ADMIN"
        | "ROLE_STORE_ADMIN"
        | "ROLE_STORE_MANAGER"
        | "ROLE_BRANCH_ADMIN"
        | "ROLE_BRANCH_MANAGER"
        | "ROLE_BRANCH_CASHIER";

      store?: Types.ObjectId;
    }

    interface Request {
      user?: User;
    }
  }
}
