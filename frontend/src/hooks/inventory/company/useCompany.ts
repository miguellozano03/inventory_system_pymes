import { useState, useEffect, useCallback } from "react";
import { companyService } from "@/services/companyService";
import type { Company, CompanyUpdate } from "@/types/company";

export const useCompany = () => {
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await companyService.get();
      setCompany(data);
    } catch (error) {
      console.error("[useCompany] fetch:", error);
      const message =
        error instanceof Error ? error.message : "Failed to fetch company";
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  const update = async (payload: CompanyUpdate) => {
    setUpdating(true);
    setError(null);

    try {
      const updated = await companyService.update(payload);
      setCompany(updated);
      return updated;
    } catch (error) {
      console.error("[useCompany] update:", error);
      const message =
        error instanceof Error ? error.message : "Failed to update company";
      setError(message);
      return null;
    } finally {
      setUpdating(false);
    }
  };

  useEffect(() => {
    fetch();
  }, [fetch]);

  return {
    company,
    loading,
    updating,
    error,
    update,
    refetch: fetch,
  };
};
