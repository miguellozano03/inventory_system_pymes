import { useState, useEffect, useCallback } from "react";
import { transactionService } from "@/services/transactionService";
import type { TransactionCreate, TransactionResponse } from "@/types/inventory";

export const useTransactions = () => {
  const [transactions, setTransactions] = useState<TransactionResponse[]>();
  const [loading, setLoading] = useState(false);
  const [creating, setCreating] = useState(false);
  const [removing, setRemoving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await transactionService.getAll();
      setTransactions(data);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Failed to fetch transactions";
      setError(message);
    } finally {
      setLoading(false);
    }

  }, []);

  const create = async (payload: TransactionCreate) => {
    setCreating(true);
    setError(null);

    try {
      const data = await transactionService.create(payload);
      setTransactions((prev) => {
        return [data, ...(prev || [])];
      });
      return data;
    } catch (error) {
      console.error("[useTransactions] create:", error);

      const message =
        error instanceof Error
          ? error.message
          : "Failed to create transaction";

      setError(message);
    } finally {
      setCreating(false);
    }
  };

  const remove = async (id: string) => {
    setRemoving(true);
    setError(null);
    setTransactions((prev) => prev?.filter((t) => t.id !== id));
    try {
      await transactionService.delete(id);
    } catch (error) {
      console.error("[useTransactions] remove:", error);

      const message =
        error instanceof Error
          ? error.message
          : "Failed to delete transaction";

      setError(message);

    } finally {
      setRemoving(false);

    }
  }
  const get = useCallback(async (id: string) => {
    return await transactionService.get(id);
  }, [])

  useEffect(() => {
    fetch();
  }, [fetch])

  return {
    transactions,
    loading,
    creating,
    removing,
    error,
    create,
    remove,
    get,
    refetch: fetch
  }

}