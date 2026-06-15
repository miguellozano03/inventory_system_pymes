export interface ProductCreate {
  category_id: string;
  supplier_id: string;
  internal_reference: string;
  name: string;
  description: string | null;
  stock: number;
  cost_price: number;
  sale_price: number;
  is_active: boolean;
}

export interface ProductResponse {
  id: string;
  company_id: string;
  category_id: string;
  category_name: string;
  supplier_id: string | null;
  internal_reference: string;
  name: string;
  description: string | null;
  stock: number;
  cost_price: number;
  sale_price: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ProductUpdate {
  category_id: string | null;
  supplier_id: string | null;
  internal_reference: string | null;
  name: string | null;
  description: string | null;
  stock: number | null;
  cost_price: number | null;
  sale_price: number | null;
  is_active: boolean | null;
}
