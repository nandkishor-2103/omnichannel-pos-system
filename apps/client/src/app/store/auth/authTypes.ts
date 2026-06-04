import type { User } from "@/types/user";

export interface SignUpResponse {
  user: User;
  message: string;
}

export interface SignInResponse {
  statusCode: number;
  success: boolean;
  message: string;
  payload: {
    user: User;
  };
}

export interface AuthState {
  user: User | null;
  loading: boolean;
  initialized: boolean;
  error: string | null;
}
