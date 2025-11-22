import { create } from "zustand";

export interface Wallet {
  id: string;
  address: string;
  scheme: string;
}

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  wallets: Wallet[];
  setAuth: (isAuthenticated: boolean, wallets: Wallet[]) => void;
  setLoading: (isLoading: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  isLoading: true,
  wallets: [],
  setAuth: (isAuthenticated, wallets) =>
    set({ isAuthenticated, wallets, isLoading: false }),
  setLoading: (isLoading) => set({ isLoading }),
  logout: () => set({ isAuthenticated: false, wallets: [], isLoading: false }),
}));
