export interface UserResponseDto {
  id: string;
  fullName: string;
  email: string;
  phone?: string;

  role: string;

  verified: boolean;

  store: {
    id: string;
    brand: string;
  } | null;

  branch: {
    id: string;
    name: string;
  } | null;

  lastLogin?: Date;
}
