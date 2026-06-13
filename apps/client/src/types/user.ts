import type { UserRole } from "@/features/auth/types/types";

export interface User {
  id: string;
  fullName: string;
  email: string;
  phone?: string;

  role: UserRole;

  verified?: boolean;

  store?: {
    id: string;
    brand: string;

    contact: {
      address: string;
      phone: string;
      email: string;
    };
  } | null;

  branch?: {
    id: string;
    name: string;
    address: string;
  } | null;

  lastLogin?: string;
}
