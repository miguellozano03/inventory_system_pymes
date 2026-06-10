export interface TokenPairResponse {
  email: string;
  refresh: string;
  access: string;
}

export interface TokenRefreshResponse {
  refresh: string;
  access: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  identification: string;
  company_name: string;
  company_nit: string;
  company_email: string;
  company_phone: string;
}
