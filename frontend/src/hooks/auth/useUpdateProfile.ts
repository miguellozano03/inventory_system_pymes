import { useState } from "react";
import type { AxiosError } from "axios";
import { userService } from "@/services/userService";
import type { UpdateProfilePayload, User } from "@/types/user";

export const useUpdateProfile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateProfile = async (
    payload: UpdateProfilePayload,
  ): Promise<User | null> => {
    setIsLoading(true);
    setError(null);
    try {
      const updated = await userService.updateMe(payload);
      return updated;
    } catch (err) {
      const axiosError = err as AxiosError<any>;
      setError(
        axiosError.response?.data?.detail ||
          axiosError.response?.data?.message ||
          JSON.stringify(axiosError.response?.data) ||
          "Error al actualizar el perfil",
      );
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return { updateProfile, isLoading, error };
};