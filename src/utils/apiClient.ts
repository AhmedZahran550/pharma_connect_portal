"use client";

import axios, {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
} from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// Create axios instance with default config
const apiClient: AxiosInstance = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});
// Flag to prevent multiple refresh attempts
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: Error) => void;
}> = [];

const processQueue = (error: Error | null, token: string | null = null) => {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else if (token) {
      promise.resolve(token);
    }
  });
  failedQueue = [];
};

// Helper to get user from localStorage
const getStoredUser = (): {
  access_token: string;
  refresh_token?: string;
} | null => {
  if (typeof window === "undefined") return null;
  const userStr = localStorage.getItem("user");
  if (!userStr) return null;
  try {
    return JSON.parse(userStr);
  } catch {
    return null;
  }
};

// Helper to set user in localStorage
const setStoredUser = (user: {
  access_token: string;
  refresh_token?: string;
}) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("user", JSON.stringify(user));
  }
};

// Helper to clear auth data
const clearAuth = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("user");
    // Clear refresh_token cookie if using js-cookie
    document.cookie =
      "refresh_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  }
};

// Request interceptor for adding auth token and Accept-Language header
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const user = getStoredUser();
    if (user?.access_token) {
      config.headers.Authorization = `Bearer ${user.access_token}`;
    }

    // Add Accept-Language header for localized error messages
    // Check localStorage first, then fallback to navigator language
    let language = "en";
    if (typeof window !== "undefined") {
      const storedLang = localStorage.getItem("i18nextLng");
      if (storedLang) {
        language = storedLang.split("-")[0]; // 'en-US' -> 'en'
      } else if (navigator.language) {
        language = navigator.language.split("-")[0];
      }
    }
    config.headers["Accept-Language"] = language;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling token refresh
apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<{ errorCode?: string }>) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    // Check if error is due to expired token
    const isTokenExpired =
      error.response?.status === 401 ||
      error.response?.data?.errorCode === "TOKEN_EXPIRED";

    if (isTokenExpired && originalRequest && !originalRequest._retry) {
      if (isRefreshing) {
        // If already refreshing, queue this request
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (token: string) => {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              resolve(apiClient(originalRequest));
            },
            reject: (err: Error) => {
              reject(err);
            },
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Attempt to refresh the token
        const response = await axios.post(
          `${API_BASE_URL}/api/auth/refresh-token`,
          {},
          {
            withCredentials: true, // Send cookies with request
          }
        );

        const { access_token, refresh_token } = response.data;

        // Update stored user with new tokens
        const user = getStoredUser();
        if (user) {
          setStoredUser({
            ...user,
            access_token,
            refresh_token: refresh_token || user.refresh_token,
          });
        }

        // Update cookie if new refresh_token provided
        if (refresh_token) {
          document.cookie = `refresh_token=${refresh_token}; path=/; secure; samesite=strict`;
        }

        // Process queued requests with new token
        processQueue(null, access_token);

        // Retry original request with new token
        originalRequest.headers.Authorization = `Bearer ${access_token}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        // Refresh failed - clear auth and redirect to login
        processQueue(refreshError as Error, null);
        clearAuth();

        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export { apiClient };
export default apiClient;
