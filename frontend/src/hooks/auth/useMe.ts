import { useState, useEffect, useCallback } from "react";
import type { AxiosError } from "axios";
import { userService } from "@/services/userService";
import type { User } from "@/types/user";

export const useMe = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMe = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await userService.getMe();
      setUser(data);
    } catch (err) {
      const axiosError = err as AxiosError<any>;
      setError(
        axiosError.response?.data?.detail ||
          axiosError.response?.data?.message ||
          "No se pudo cargar el perfil",
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMe();
  }, [fetchMe]);

  return { user, setUser, isLoading, error, refetch: fetchMe };
};
