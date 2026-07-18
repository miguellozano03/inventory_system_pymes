import { axiosClient } from "@/api/axiosClient";
import type { Company, CompanyUpdate } from "@/types/company";

export const companyService = {
  get: async (): Promise<Company> => {
    const { data } = await axiosClient.get<Company>("/companies/me");
    return data;
  },

  update: async (payload: CompanyUpdate): Promise<Company> => {
    const { data } = await axiosClient.put<Company>("/companies/me", payload);
    return data;
  },
};
