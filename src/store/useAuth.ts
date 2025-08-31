import { create } from "zustand";

interface User {
  id: number;
  username: string;
  email: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
  initializeAuth: () => void;
}

export const useAuth = create<AuthState>((set) => ({
  user: null,
  token: null,
  isLoading: true,
  login: (user, token) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    set({ user, token });
  },
  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    set({ user: null, token: null });
  },
  initializeAuth: () => {
    const token = localStorage.getItem("token");
    const userStr = localStorage.getItem("user");
    const user = userStr ? JSON.parse(userStr) : null;

    set({
      token,
      user,
      isLoading: false,
    });
  },
}));
