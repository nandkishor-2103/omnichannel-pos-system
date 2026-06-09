import type { UserRole } from "@/features/auth/types/types";

export interface User {
  id: string;
  fullName: string;
  email: string;
  phone?: string;

  role: UserRole;

  verified?: boolean;

  store?: string;
  branch?: string;

  lastLogin?: string;
}
