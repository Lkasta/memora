import { create } from "zustand";
import jwt from "jsonwebtoken";

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
  isTokenValid: () => boolean;
}

const validateToken = (token: string | null): boolean => {
  if (!token) return false;

  try {
    const decoded = jwt.decode(token) as { exp?: number } | null;

    if (!decoded || !decoded.exp) {
      return false;
    }

    const currentTime = Math.floor(Date.now() / 1000);
    return decoded.exp > currentTime;
  } catch (error) {
    console.error("Erro ao validar token:", error);
    return false;
  }
};

export const useAuth = create<AuthState>((set, get) => ({
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

    if (token && !validateToken(token)) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      set({
        token: null,
        user: null,
        isLoading: false,
      });
      return;
    }

    set({
      token,
      user,
      isLoading: false,
    });
  },

  isTokenValid: () => {
    const { token } = get();
    return validateToken(token);
  },
}));
