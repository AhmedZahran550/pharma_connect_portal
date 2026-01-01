"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppUserStore } from "@/stores/AppUserStore";

export function useAuth() {
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAppUserStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check authentication status on mount
    setIsLoading(false);
  }, []);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const requireAuth = () => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  };

  return {
    user,
    isAuthenticated,
    isLoading,
    logout: handleLogout,
    requireAuth,
  };
}
