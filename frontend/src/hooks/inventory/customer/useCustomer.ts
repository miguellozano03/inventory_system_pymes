import { useState, useEffect, useCallback } from "react";
import { customerService } from "@/services/customerService";
import type {
  CustomerUpdate,
  Customer as CustomerResponse,
} from "@/types/inventory";

export const useCustomer = (id: string) => {
  const [customer, setCustomer] = useState<CustomerResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [removing, setRemoving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await customerService.get(id);
      setCustomer(data);
    } catch (error) {
      console.error("[useCustomer] fetch:", error);
      const message =
        error instanceof Error ? error.message : "Failed to fetch customers";
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [id]);

  const update = async (payload: CustomerUpdate) => {
    setUpdating(true);
    setError(null);

    try {
      const customer = await customerService.update(id, payload);
      setCustomer(customer);
    } catch (error) {
      console.error("[useCustomer] update:", error);
      const message =
        error instanceof Error ? error.message : "Failed to update customers";
      setError(message);
    } finally {
      setUpdating(false);
    }
  };

  const remove = async () => {
    setRemoving(true);
    setError(null);

    try {
      await customerService.delete(id);
    } catch (error) {
      console.error("[useCustomer] delete:", error);
      const message =
        error instanceof Error ? error.message : "Failed to delete customers";
      setError(message);
    } finally {
      setRemoving(false);
    }
  };

  useEffect(() => {
    fetch();
  }, [fetch]);

  return {
    customer,
    loading,
    updating,
    removing,
    error,
    update,
    remove,
    refetch: fetch,
  };
};
