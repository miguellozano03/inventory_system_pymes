import { useState, useEffect, useCallback } from "react";
import { supplierService } from "@/services/supplierService";
import type { SupplierCreate, SupplierResponse } from "@/types/inventory";

export const useSuppliers = () => {
  const [suppliers, setSuppliers] = useState<SupplierResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await supplierService.getAll();
      setSuppliers(data);
    } catch (error) {
      console.error("[useSuppliers] fetch:", error);
      const message =
        error instanceof Error ? error.message : "Failed to fetch suppliers";
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  const create = async (payload: SupplierCreate) => {
    setCreating(true);
    setError(null);
    try {
      const data = await supplierService.create(payload);
      setSuppliers((prev) => [...prev, data]);
    } catch (error) {
      console.error("[useSuppliers] create:", error);
      const message =
        error instanceof Error ? error.message : "Failed to create supplier";
      setError(message);
    } finally {
    }
  };

  useEffect(() => {
    fetch();
  }, [fetch]);

  return {
    suppliers,
    loading,
    creating,
    error,
    create,
    refetch: fetch,
  };
};
