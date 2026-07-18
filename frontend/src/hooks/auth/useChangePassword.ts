import { useState } from "react";
import type { AxiosError } from "axios";
import { userService } from "@/services/userService";
import type { ChangePasswordPayload } from "@/types/user";

export const useChangePassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const changePassword = async (
    payload: ChangePasswordPayload,
  ): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const res = await userService.changePassword(payload);
      setSuccess(res.message);
      return true;
    } catch (err) {
      const axiosError = err as AxiosError<any>;
      setError(
        axiosError.response?.data?.detail ||
          axiosError.response?.data?.message ||
          "Error al cambiar la contraseña",
      );
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { changePassword, isLoading, error, success };
};