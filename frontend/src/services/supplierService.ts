import { axiosClient } from "@/api/axiosClient";
import type {
  SupplierCreate,
  SupplierResponse,
  SupplierUpdate,
} from "@/types/inventory";

export const supplierService = {
  create: async (payload: SupplierCreate): Promise<SupplierResponse> => {
    const { data } = await axiosClient.post<SupplierResponse>(
      "/contacts/suppliers",
      payload,
    );
    return data;
  },

  getAll: async (): Promise<SupplierResponse[]> => {
    const { data } = await axiosClient.get<SupplierResponse[]>(
      "/contacts/suppliers",
    );
    return data;
  },

  get: async (id: string): Promise<SupplierResponse> => {
    const { data } = await axiosClient.get<SupplierResponse>(
      `/contacts/suppliers/${id}`,
    );
    return data;
  },

  update: async (
    id: string,
    payload: SupplierUpdate,
  ): Promise<SupplierResponse> => {
    const { data } = await axiosClient.patch<SupplierResponse>(
      `/contacts/suppliers/${id}`,
      payload,
    );
    return data;
  },

  delete: async (id: string): Promise<void> => {
    await axiosClient.delete(`/contacts/suppliers/${id}`);
  },
};
