import { axiosClient } from "@/api/axiosClient";
import type {
  ProductCreate,
  ProductResponse,
  ProductUpdate,
} from "@/types/inventory";

export const productService = {
  create: async (payload: ProductCreate): Promise<ProductResponse> => {
    const { data } = await axiosClient.post<ProductResponse>(
      "/inventory/products",
      payload,
    );
    return data;
  },

  getAll: async (): Promise<ProductResponse[]> => {
    const { data } = await axiosClient.get<ProductResponse[]>(
      "/inventory/products",
    );

    return data;
  },

  get: async (id: string): Promise<ProductResponse> => {
    const { data } = await axiosClient.get<ProductResponse>(
      `/inventory/products/${id}`,
    );

    return data;
  },

  update: async (
    id: string,
    payload: ProductUpdate,
  ): Promise<ProductResponse> => {
    const { data } = await axiosClient.patch<ProductResponse>(
      `/inventory/products/${id}`,
      payload,
    );
    return data;
  },

  delete: async (id: string): Promise<void> => {
    await axiosClient.delete(`/inventory/products/${id}`);
  },
};
