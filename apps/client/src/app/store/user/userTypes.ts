export interface User {
  _id: string;
  name: string;
  email: string;
  role?: string;
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
