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
    let retryTimeout: ReturnType<typeof setTimeout> | undefined;

    const scheduleRetry = () => {
      if (!isMounted) return;
      // Tenta novamente em 3 segundos
      retryTimeout = setTimeout(checkHealth, 3000);
    };

    const checkHealth = async () => {
      try {
        const response = await api.get("/health");
        if (response.data?.status === "ok") {
          if (isMounted) setIsReady(true);
        } else {
          scheduleRetry();
        }
      } catch (error) {
        console.warn("Server is starting...", error);
        scheduleRetry();
      }
    };

    checkHealth();

    return () => {
      isMounted = false;
      clearTimeout(retryTimeout);
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
