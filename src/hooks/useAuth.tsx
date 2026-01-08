"use client";

import { useMutation } from "@tanstack/react-query";
import apiClient from "@/utils/apiClient";
import { AuthResponse, LoginCredentials, User } from "@/types";
import { useAppUserStore } from "@/stores/AppUserStore";

/**
 * Hook for user login
 */
// Hook for user login
export function useLogin() {
  const setUser = useAppUserStore((state) => state.setUser);

  return useMutation<AuthResponse, Error, LoginCredentials>({
    mutationFn: async (credentials: LoginCredentials) => {
      const response = await apiClient.post<AuthResponse>("/auth/token", {
        grant_type: "password",
        client_id: "portal",
        email: credentials.email,
        password: credentials.password,
      });
      return response.data;
    },
    onSuccess: (data) => {
      // Store user and tokens in localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem(
          "user",
          JSON.stringify({
            user: data.user,
            access_token: data.access_token,
            refresh_token: data.refresh_token,
          })
        );

        // Also store refresh_token as cookie if provided
        if (data.refresh_token) {
          document.cookie = `refresh_token=${data.refresh_token}; path=/; secure; samesite=strict`;
        }
      }

      // Update Zustand store
      setUser(data.user);
    },
  });
}

/**
 * Hook for user logout
 */
/**
 * Hook for user logout
 */
export function useLogout() {
  const clearUser = useAppUserStore((state) => state.clearUser);

  return useMutation<void, Error>({
    mutationFn: async () => {
      try {
        await apiClient.post<{ success: boolean }>("/auth/logout");
      } catch (error) {
        // We ignore errors here because we want to clear local state regardless
        // of whether the server successfully processed the logout.
        // Common errors might be 401 if token already expired.
        console.warn("Logout API call failed", error);
      }
    },
    onSuccess: () => {
      // Clear localStorage
      if (typeof window !== "undefined") {
        localStorage.removeItem("user");
        document.cookie =
          "refresh_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      }

      // Clear Zustand store
      clearUser();
    },
  });
}

/**
 * Hook to get current user from storage
 */
export function useCurrentUser(): User | null {
  if (typeof window === "undefined") return null;

  const userStr = localStorage.getItem("user");
  if (!userStr) return null;

  try {
    const stored = JSON.parse(userStr);
    return stored.user;
  } catch {
    return null;
  }
}
