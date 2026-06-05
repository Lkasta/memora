"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import api from "@/lib/api";
import { ServerWakingUp } from "@/components/ServerWakingUp";

interface HealthCheckContextType {
  isReady: boolean;
}

const HealthCheckContext = createContext<HealthCheckContextType | undefined>(
  undefined,
);

export function HealthCheckProvider({ children }: { children: ReactNode }) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const checkHealth = async () => {
      try {
        const response = await api.get("/health");
        if (response.data?.status === "ok" && isMounted) {
          setIsReady(true);
        } else {
          setTimeout(checkHealth, 3000);
        }
      } catch (error) {
        console.warn("Server is starting...", error);
        if (isMounted) {
          // Tenta novamente em 3 segundos
          setTimeout(checkHealth, 3000);
        }
      }
    };

    checkHealth();

    return () => {
      isMounted = false;
    };
  }, []);

  if (!isReady) {
    return <ServerWakingUp />;
  }

  return (
    <HealthCheckContext.Provider value={{ isReady }}>
      {children}
    </HealthCheckContext.Provider>
  );
}

export const useHealth = () => {
  const context = useContext(HealthCheckContext);
  if (context === undefined) {
    throw new Error("useHealth must be used within a HealthCheckProvider");
  }
  return context;
};
