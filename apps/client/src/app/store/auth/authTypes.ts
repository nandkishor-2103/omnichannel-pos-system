export interface User {
  _id: string;
  name: string;
  email: string;
}

export interface SignUpResponse {
  user: User;
  message: string;
}

export interface SignInResponse {
  user: User;
  message: string;
}

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}
