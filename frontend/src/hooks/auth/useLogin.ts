import { useState } from "react";
import type { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/router/AuthContext";
import { type LoginCredentials } from "@/types/auth";
import { authService } from "@/services/authService";

export const useLogin = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loginUser = async (credentials: LoginCredentials) => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await authService.login(credentials);

      login(data.access, data.refresh);
      navigate("/dashboard", { replace: true });
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
    loginUser,
    isLoading,
    error,
  };
};
