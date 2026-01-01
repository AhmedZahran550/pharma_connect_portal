import { create } from "zustand";

interface DashboardStats {
  totalAppointments: number;
  totalOrders: number;
  totalBranches: number;
  totalStaff: number;
  pendingTickets: number;
}

interface HomeStatesState {
  stats: DashboardStats;
  isLoading: boolean;
  setStats: (stats: DashboardStats) => void;
  setLoading: (loading: boolean) => void;
}

export const useHomeStatesStore = create<HomeStatesState>((set) => ({
  stats: {
    totalAppointments: 0,
    totalOrders: 0,
    totalBranches: 0,
    totalStaff: 0,
    pendingTickets: 0,
  },
  isLoading: false,
  setStats: (stats) => set({ stats }),
  setLoading: (isLoading) => set({ isLoading }),
}));
