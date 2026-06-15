import { useState, useEffect, useCallback } from "react";
import { productService } from "@/services/productService";
import type { ProductResponse, ProductUpdate } from "@/types/inventory";

export const useProduct = (id: string) => {
  const [product, setProduct] = useState<ProductResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [removing, setRemoving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await productService.get(id);
      setProduct(data);
    } catch (error) {
      console.error("[useProduct] fetch:", error);
      const message =
        error instanceof Error ? error.message : "Failed to fetch product";
      setError(message);
    } finally {
      setUpdating(false);
    }
  }, []);

  const update = async (payload: ProductUpdate) => {
    setUpdating(true);
    setError(null);

    try {
      const data = await productService.update(id, payload);
      setProduct(data);
    } catch (error) {
      console.error("[useProduct] update:", error);
      const message =
        error instanceof Error ? error.message : "Failed to update product";
      setError(message);
    } finally {
      setUpdating(false);
    }
  };

  const remove = async () => {
    setRemoving(true);
    setError(null);

    try {
      await productService.delete(id);
    } catch (error) {
      console.error("[useProduct] remove:", error);
      const message =
        error instanceof Error ? error.message : "Failed to remove product";
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
