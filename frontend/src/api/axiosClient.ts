import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";
import type { TokenRefreshResponse } from "@/types/auth";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

export const axiosClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

axiosClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const access = localStorage.getItem("access_token");
    if (access && config.headers) {
      config.headers.Authorization = `Bearer ${access}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

axiosClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    if (
      originalRequest.url?.includes("/token/pair") ||
      originalRequest.url?.includes("/token/refresh")
    ) {
      return Promise.reject(error);
    }

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      })
        .then((token) => {
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${token}`;
          }
          return axiosClient(originalRequest);
        })
        .catch((err) => Promise.reject(err));
    }

    originalRequest._retry = true;
    isRefreshing = true;

    const refreshToken = localStorage.getItem("refresh_token");

    if (!refreshToken) {
      logoutUser();
      return Promise.reject(error);
    }

    try {
      const response = await axios.post<TokenRefreshResponse>(
        `${API_URL}/token/refresh`,
        {
          refresh: refreshToken,
        },
      );

      const { access, refresh: newRefresh } = response.data;

      localStorage.setItem("access_token", access);
      if (newRefresh) {
        localStorage.setItem("refresh_token", newRefresh);
      }

      processQueue(null, access);

      if (originalRequest.headers) {
        originalRequest.headers.Authorization = `Bearer ${access}`;
      }

      return axiosClient(originalRequest);
    } catch (refreshError) {
      processQueue(refreshError, null);
      logoutUser();
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  },
);

function logoutUser() {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");

  window.dispatchEvent(new Event("auth_logout"));
}
