export interface Company {
  id: string;
  name: string;
  nit: string;
  email: string;
  phone: string;
}

export type UserRole = "ADMIN" | "SELLER" | "VIEWER";

export interface User {
  id: string;
  company: Company | null;
  role: UserRole;
  email: string;
  first_name: string;
  last_name: string;
  identification: string;
  is_active: boolean;
  is_staff: boolean;
  created_at: string;
  updated_at: string;
}

export interface UpdateProfilePayload {
  first_name?: string;
  last_name?: string;
  identification?: string;
  email?: string;
}

export interface ChangePasswordPayload {
  old_password: string;
  new_password: string;
}

export interface ChangePasswordResponse {
  success: boolean;
  message: string;
}