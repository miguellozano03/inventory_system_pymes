export interface Customer {
  id: string;
  company: string;
  name: string;
  identification: string;
  email: string | null;
  phone: string | null;
  address: string | null;
  created_at: string;
  updated_at: string;
}