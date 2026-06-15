import { useState, useEffect, useCallback } from "react";
import { categoryService } from "@/services/categoryService";
import type { CategoryCreate, CategoryResponse } from "@/types/inventory";

export const useCategories = () => {
  const [categories, setCategories] = useState<CategoryResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    try {
      const data = await categoryService.getAll();
      if (!cancelled) setCategories(data);
    } catch (err) {
      console.error("[useCategories] fetch:", err);
      if (!cancelled) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch categories",
        );
      }
    } finally {
      if (!cancelled) setLoading(false);
    }

    return () => {
      cancelled = true;
    };
  }, []);

  const create = useCallback(async (payload: CategoryCreate) => {
    setCreating(true);
    setError(null);
    
    try {
      const category = await categoryService.create(payload);
      setCategories((prev) => [...prev, category]);

      return category;
    } catch (err) {
      console.error("[useCategories] create:", err);
      const message =
        err instanceof Error ? err.message : "Failed to create category";
      setError(message);
      throw err;
    } finally {
      setCreating(false);
    }
  }, []);

  useEffect(() => {
    const cleanup = fetch();
    return () => {
      cleanup.then((fn) => fn?.());
    };
  }, [fetch]);

  return {
    categories,
    loading,
    creating,
    error,
    create,
    refetch: fetch,
  };
};
