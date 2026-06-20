import { useState, useEffect, useCallback } from "react";
import { productService } from "@/services/productService";
import type { ProductResponse, ProductUpdate } from "@/types/inventory";

export const useProduct = (id?: string) => {
  const [product, setProduct] = useState<ProductResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [removing, setRemoving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    if (!id) return;

    setLoading(true);
    setError(null);

    try {
      const data = await productService.get(id);
      setProduct(data);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to fetch product";
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [id]);

  const update = async (payload: ProductUpdate) => {
    if (!id) return;

    setUpdating(true);
    setError(null);

    try {
      const data = await productService.update(id, payload);
      setProduct(data);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to update product";
      setError(message);
    } finally {
      setUpdating(false);
    }
  };

  const remove = async (targetId?: string) => {
    const finalId = targetId ?? id;
    if (!finalId) return;

    setRemoving(true);
    setError(null);

    try {
      await productService.delete(finalId);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to remove product";
      setError(message);
    } finally {
      setRemoving(false);
    }
  };

  useEffect(() => {
    fetch();
  }, [fetch]);

  return {
    product,
    loading,
    updating,
    removing,
    error,
    update,
    remove,
    refetch: fetch,
  };
};
