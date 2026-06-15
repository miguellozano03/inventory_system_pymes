import { useState, useEffect, useCallback } from "react";
import { customerService } from "@/services/customerService";
import type {
  CustomerCreate,
  Customer as CustomerResponse,
} from "@/types/inventory";

export const useCustomers = () => {
  const [customers, setCustomers] = useState<CustomerResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await customerService.getAll();
      setCustomers(data);
    } catch (error) {
      console.error("[useCustomers] fetch:", error);
      const message =
        error instanceof Error ? error.message : "Failed to fetch customers";
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  const create = async (payload: CustomerCreate) => {
    setCreating(true);
    setError(null);

    try {
      const data = await customerService.create(payload);
      setCustomers((prev) => [...prev, data]);
    } catch (error) {
      console.error("[useCustomers] create:", error);
      const message =
        error instanceof Error ? error.message : "Failed to create customers";
      setError(message);
    } finally {
      setCreating(false);
    }
  };

  useEffect(() => {
    fetch();
  }, [fetch]);

  return {
    customers,
    loading,
    error,
    creating,
    create,
    refetch: fetch,
  };
};
