export type TransactionType = "IN" | "OUT";

export interface TransactionDetail {
  id: string;
  transaction: string;
  product: string;
  product_name: string;
  quantity: number;
  unit_price: string;
  subtotal: string;
}

export interface Transaction {
  id: string;
  company: string;
  user: string;
  customer: string | null;
  supplier: string | null;
  type: TransactionType;
  total: string;
  created_at: string;
  details?: TransactionDetail[];
}
