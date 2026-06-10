import { useState } from "react";
import type { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { authService } from "@/services/authService";
import { type RegisterCredentials } from "@/types/auth";

export const useRegister = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const registerUser = async (payload: RegisterCredentials) => {
    setIsLoading(true);
    setError(null);

    try {
      await authService.register(payload);
      navigate("/dashboard");
    } catch (error) {
      const axiosError = error as AxiosError<any>;

      setError(
        axiosError.response?.data?.detail ||
          axiosError.response?.data?.message ||
          JSON.stringify(axiosError.response?.data) ||
          "Error desconocido",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return {
    registerUser,
    isLoading,
    error,
  };
};
