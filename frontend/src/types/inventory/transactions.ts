export interface Customer {
  id: string;
  name: string;
}

export interface Supplier {
  id: string;
  name: string;
}

export interface Product {
  id: string;
  name: string;
  internal_reference: string;
}

interface User {
  id: string;
  email: string;
}

// ───────────── CREATE ─────────────

export interface TransactionDetailCreate {
  product_id: string;
  quantity: number;
}

export interface TransactionCreate {
  type: "IN" | "OUT";

  customer_id?: string | null;
  supplier_id?: string | null;

  details: TransactionDetailCreate[];
}

// ───────────── READ ─────────────

export interface TransactionDetail {
  id: string;
  product: Product;
  quantity: number;
  unit_price: number;
  subtotal: number;
}

export interface Transaction {
  id: string;
  type: "IN" | "OUT";
  total: number;

  customer?: Customer | null;
  supplier?: Supplier | null;
  user?: User | null;

  created_at: string;

  details: TransactionDetail[];
}