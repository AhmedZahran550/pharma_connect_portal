import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "@/types";

interface AppUserState {
  user: User | null;
  isAuthenticated: boolean;
  token: string | null;
  setUser: (user: User) => void;
  setToken: (token: string) => void;
  clearUser: () => void;
  logout: () => void;
}

export const useAppUserStore = create<AppUserState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      token: null,
      setUser: (user) => set({ user, isAuthenticated: true }),
      setToken: (token) => set({ token }),
      clearUser: () => set({ user: null, isAuthenticated: false, token: null }),
      logout: () => set({ user: null, isAuthenticated: false, token: null }),
    }),
    {
      name: "app-user-storage",
    }
  )
);
