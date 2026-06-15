import { useState, useEffect, useCallback } from "react";
import { categoryService } from "@/services/categoryService";
import type { CategoryResponse, CategoryUpdate } from "@/types/inventory";

export const useCategory = (id: string) => {
  const [category, setCategory] = useState<CategoryResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [removing, setRemoving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCategory = useCallback(async () => {
    if (!id) return;

    let cancelled = false;
    setLoading(true);
    setError(null);

    try {
      const data = await categoryService.get(id);
      if (!cancelled) setCategory(data);
    } catch (err) {
      console.error("[useCategory] fetchCategory:", err);
      if (!cancelled) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch category",
        );
      }
    } finally {
      if (!cancelled) setLoading(false);
    }

    return () => {
      cancelled = true;
    };
  }, [id]);

  const update = useCallback(
    async (payload: CategoryUpdate) => {
      setUpdating(true);
      setError(null);
      try {
        const updated = await categoryService.update(id, payload);
        setCategory(updated);

        return updated;
      } catch (err) {
        console.error("[useCategory] update:", err);
        const message =
          err instanceof Error ? err.message : "Failed to update category";
        setError(message);
        throw err;
      } finally {
        setUpdating(false);
      }
    },
    [id],
  );

  const remove = useCallback(async () => {
    try {
      setRemoving(true);
      setError(null);

      await categoryService.delete(id);
      setCategory(null);
    } catch (err) {
      console.error("[useCategory] remove:", err);
      const message =
        err instanceof Error ? err.message : "Failed to remove category";
      setError(message);
      throw err;
    } finally {
      setRemoving(false);
    }
  }, [id]);

  useEffect(() => {
    const cleanup = fetchCategory();
    return () => {
      cleanup.then((fn) => fn?.());
    };
  }, [fetchCategory]);

  return {
    category,
    loading,
    updating,
    removing,
    error,
    update,
    remove,
    refetch: fetchCategory,
  };
};
