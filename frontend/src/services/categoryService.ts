import { axiosClient } from "@/api/axiosClient";
import type {
  CategoryCreate,
  CategoryResponse,
  CategoryUpdate,
} from "@/types/inventory";

export const categoryService = {
  create: async (payload: CategoryCreate): Promise<CategoryResponse> => {
    const { data } = await axiosClient.post<CategoryResponse>(
      "/inventory/categories",
      payload,
    );
    return data;
  },

  getAll: async (): Promise<CategoryResponse[]> => {
    const { data } = await axiosClient.get<CategoryResponse[]>(
      "/inventory/categories",
    );
    return data;
  },

  get: async (id: string): Promise<CategoryResponse> => {
    const { data } = await axiosClient.get<CategoryResponse>(
      `/inventory/categories/${id}`,
    );
    return data;
  },

  update: async (
    id: string,
    payload: CategoryUpdate,
  ): Promise<CategoryResponse> => {
    const { data } = await axiosClient.patch<CategoryResponse>(
      `/inventory/categories/${id}`,
      payload,
    );
    return data;
  },

  delete: async (id: string): Promise<void> => {
    await axiosClient.delete(`/inventory/categories/${id}`);
  },
};
