import { axiosClient } from "@/api/axiosClient";
import type {
  LoginCredentials,
  TokenPairResponse,
  RegisterCredentials,
} from "@/types/auth";

export const authService = {
  /**
   * Envía las credenciales al backend para obtener el par de tokens (access y refresh)
   */
  login: async (credentials: LoginCredentials): Promise<TokenPairResponse> => {
    const { data } = await axiosClient.post<TokenPairResponse>(
      "/token/pair",
      credentials,
    );
    return data;
  },

  /**
   * Envia un payload al backend para registrar un nuevo usuario
   */
  register: async (payload: RegisterCredentials) => {
    const { data } = await axiosClient.post("/accounts/register", payload);

    return data;
  },

  /**
   * Verifica si el token actual sigue siendo válido en el backend
   */
  verifyToken: async (token: string): Promise<void> => {
    await axiosClient.post("/token/verify", { token });
  },

  refreshToken: async (refresh: string): Promise<TokenPairResponse> => {
    const { data } = await axiosClient.post<TokenPairResponse>(
      "/token/refresh",
      refresh,
    );

    return data;
  },
};
