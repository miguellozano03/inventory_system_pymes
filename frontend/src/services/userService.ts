import { axiosClient } from "@/api/axiosClient";
import type {
  User,
  UpdateProfilePayload,
  ChangePasswordPayload,
  ChangePasswordResponse,
} from "@/types/user";

export const userService = {
  getMe: async (): Promise<User> => {
    const { data } = await axiosClient.get<User>("/accounts/me");
    return data;
  },

  updateMe: async (payload: UpdateProfilePayload): Promise<User> => {
    const { data } = await axiosClient.put<User>("/accounts/me", payload);
    return data;
  },

  changePassword: async (
    payload: ChangePasswordPayload,
  ): Promise<ChangePasswordResponse> => {
    const { data } = await axiosClient.post<ChangePasswordResponse>(
      "/accounts/me/change-password",
      payload,
    );
    return data;
  },
};
