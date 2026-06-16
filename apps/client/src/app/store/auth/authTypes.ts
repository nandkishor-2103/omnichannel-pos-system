import type { User } from "@/types/user";

export interface SignUpResponse {
  statusCode: number;
  success: boolean;
  message: string;

  payload: {
    user: User;
  };
}

export interface SignInResponse {
  statusCode: number;
  success: boolean;
  message: string;
  payload: {
    user: User;
  };
}

export interface BasicApiResponse {
  statusCode: number;
  success: boolean;
  message: string;
}

export interface AuthState {
  user: User | null;
  loading: boolean;
  initialized: boolean;
  error: string | null;
}
