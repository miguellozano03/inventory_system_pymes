import { useState, useEffect, useCallback } from "react";
import { supplierService } from "@/services/supplierService";
import type { SupplierResponse, SupplierUpdate } from "@/types/inventory";

export const useSupplier = (id: string) => {
  const [supplier, setSupplier] = useState<SupplierResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [removing, setRemoving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await supplierService.get(id);
      setSupplier(data);
    } catch (error) {
      console.error("[useSupplier] fetch:", error);
      const message =
        error instanceof Error ? error.message : "Failed to fetch supplier";
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  const update = async (payload: SupplierUpdate) => {
    setUpdating(true);
    setError(null);

    try {
      const data = await supplierService.update(id, payload);
      setSupplier(data);
    } catch (error) {
      console.error("[useSupplier] update:", error);
      const message =
        error instanceof Error ? error.message : "Failed to update supplier";
      setError(message);
    } finally {
      setUpdating(false);
    }
  };

  const remove = async () => {
    setRemoving(true);
    setError(null);

    try {
      await supplierService.delete(id);
    } catch (error) {
      console.error("[useSupplier] update:", error);
      const message =
        error instanceof Error ? error.message : "Failed to update supplier";
      setError(message);
    } finally {
      setRemoving(false);
    }
  };

  useEffect(() => {
    fetch();
  }, [fetch]);

  return {
    supplier,
    loading,
    updating,
    removing,
    error,
    update,
    remove,
    refetch: fetch,
  };
};
