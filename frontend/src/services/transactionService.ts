import { axiosClient } from "@/api/axiosClient";
import type { TransactionCreate, TransactionResponse } from "@/types/inventory";


export const transactionService = {
  create: async (payload: TransactionCreate): Promise<TransactionResponse> => {
    const { data } = await axiosClient.post<TransactionResponse>("/transactions", payload);
    return data;
  },

  getAll: async (): Promise<TransactionResponse[]> => {
    const { data } = await axiosClient.get<TransactionResponse[]>("/transactions");
    return data;
  },

  get: async (id: string): Promise<TransactionResponse> => {
    const { data } = await axiosClient.get<TransactionResponse>(`/transactions/${id}`)
    return data;
  },

  delete: async (id: string): Promise<void> => {
    await axiosClient.delete(`/transactions/${id}`);
  }
}