import { useState, useEffect, useCallback } from "react";
import { productService } from "@/services/productService";
import type { ProductResponse, ProductCreate } from "@/types/inventory";

export const useProducts = () => {
  const [products, setProducts] = useState<ProductResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await productService.getAll();
      setProducts(data);
    } catch (error) {
      console.error("[useProducts] fetch:", error);
      const message =
        error instanceof Error ? error.message : "Failed to fetch products";
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  const create = async (payload: ProductCreate) => {
    setCreating(true);
    setError(null);
    try {
      const data = await productService.create(payload);
      setProducts((prev) => [...prev, data]);
    } catch (error) {
      console.error("[useProducts] create:", error);
      const message =
        error instanceof Error ? error.message : "Failed to fetch products";
      setError(message);
    }
  };

  useEffect(() => {
    fetch();
  }, [fetch]);

  return {
    products,
    loading,
    creating,
    error,
    create,
    refetch: fetch,
  };
};
