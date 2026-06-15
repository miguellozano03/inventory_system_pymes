export interface Customer {
  id: string;
  company_id: string;
  identification: string;
  name: string;
  email: string | null;
  phone: string | null;
  address: string | null;
  created_at: string;
  updated_at: string;
}

export interface CustomerCreate {
  name: string;
  identification: string;
  email: string;
  phone: string;
  address: string;
}

export interface CustomerUpdate {
  name: string | null;
  identification: string | null;
  email: string | null;
  phone: string | null;
  address: string | null;
}
