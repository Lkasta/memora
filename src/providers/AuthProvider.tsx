"use client";

import { ReactNode, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/store/useAuth";
import { Loader } from "@/components/Loader";

const publicRoutes = ["/login", "/register"];

export default function AuthProvider({ children }: { children: ReactNode }) {
  const { token, isLoading, initializeAuth, logout, isTokenValid } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  useEffect(() => {
    if (isLoading) return;

    // Verifica se o token existe e se ainda é válido
    const hasValidToken = token && isTokenValid();

    if (!hasValidToken && !publicRoutes.includes(pathname)) {
      // Se não tem token válido e não está em rota pública, desloga e vai pro login
      if (token) {
        logout(); // Limpa dados se tinha token mas estava inválido
      }
      router.replace("/login");
      return;
    }

    if (hasValidToken && publicRoutes.includes(pathname)) {
      console.log("vai pra home");
      router.replace("/");
    }
  }, [token, pathname, router, isLoading, isTokenValid, logout]);

  if (isLoading) {
    return <Loader />;
  }

  return <>{children}</>;
}
