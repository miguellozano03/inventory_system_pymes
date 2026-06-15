import { axiosClient } from "@/api/axiosClient";
import type {
  CustomerCreate,
  CustomerUpdate,
  Customer as CustomerResponse,
} from "@/types/inventory";

export const customerService = {
  create: async (payload: CustomerCreate): Promise<CustomerResponse> => {
    const { data } = await axiosClient.post<CustomerResponse>(
      "contacts/customers",
      payload,
    );
    return data;
  },

  getAll: async (): Promise<CustomerResponse[]> => {
    const { data } =
      await axiosClient.get<CustomerResponse[]>("contacts/customers");
    return data;
  },

  get: async (id: string): Promise<CustomerResponse> => {
    const { data } = await axiosClient.get<CustomerResponse>(
      `contacts/customers/${id}`,
    );
    return data;
  },

  update: async (
    id: string,
    payload: CustomerUpdate,
  ): Promise<CustomerResponse> => {
    const { data } = await axiosClient.patch<CustomerResponse>(
      `contacts/customers/${id}`,
      payload,
    );
    return data;
  },

  delete: async (id: string): Promise<void> => {
    await axiosClient.delete(`contacts/customers/${id}`);
  },
};
