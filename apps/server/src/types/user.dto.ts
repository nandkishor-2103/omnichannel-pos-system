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
    status: string;

    contact: {
      address: string;
      phone: string;
      email: string;
    };
  } | null;

  branch: {
    id: string;
    name: string;
    address: string;
  } | null;

  lastLogin?: Date;
}
