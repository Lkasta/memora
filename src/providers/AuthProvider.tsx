"use client";

import { ReactNode, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/store/useAuth";
import { Loader } from "@/components/Loader";

const publicRoutes = ["/login", "/register"];

export default function AuthProvider({ children }: { children: ReactNode }) {
  const { token, isLoading, initializeAuth } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  useEffect(() => {
    if (isLoading) return;

    if (!token && !publicRoutes.includes(pathname)) {
      router.replace("/login");
    }

    if (token && publicRoutes.includes(pathname)) {
      console.log("vai pra home");
      router.replace("/");
    }
  }, [token, pathname, router, isLoading]);

  if (isLoading) {
    return <Loader />;
  }

  return <>{children}</>;
}
