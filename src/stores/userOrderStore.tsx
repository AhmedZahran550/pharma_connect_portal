import { create } from "zustand";

interface OrderItem {
  productId: string;
  name: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  items: OrderItem[];
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  total: number;
  createdAt: string;
}

interface UserOrderState {
  currentOrder: Order | null;
  orderHistory: Order[];
  setCurrentOrder: (order: Order | null) => void;
  addToHistory: (order: Order) => void;
  clearHistory: () => void;
}

export const useUserOrderStore = create<UserOrderState>((set) => ({
  currentOrder: null,
  orderHistory: [],
  setCurrentOrder: (currentOrder) => set({ currentOrder }),
  addToHistory: (order) =>
    set((state) => ({
      orderHistory: [order, ...state.orderHistory],
    })),
  clearHistory: () => set({ orderHistory: [] }),
}));
