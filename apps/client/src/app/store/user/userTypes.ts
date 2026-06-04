import type { User } from "@/types/user";

export interface UserProfileResponse {
  statusCode: number;
  success: boolean;
  message: string;
  payload: {
    user: User;
  };
}

export interface UserState {
  userProfile: User | null;
  users: User[];
  customers: User[];
  cashiers: User[];
  selectedUser: User | null;
  loading: boolean;
  error: string | null;
}
