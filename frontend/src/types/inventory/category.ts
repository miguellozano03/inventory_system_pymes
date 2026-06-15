export interface CategoryCreate {
  name: string;
  description: string | null;
}

export interface CategoryResponse {
  id: string;
  company_id: string;
  name: string;
  description: string | null;
}

export interface CategoryUpdate {
  name: string | null;
  description: string | null;
}
