export interface Company {
  id: string;
  name: string;
  nit: string;
  email: string;
  phone: string;
  created_at: string;
  updated_at: string;
}

export interface CompanyUpdate {
  name?: string;
  email?: string;
  phone?: string;
}
