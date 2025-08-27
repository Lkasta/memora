"use client";

import api from "@/lib/api";

import { Loader, PlusIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useCallback, useState } from "react";
import { getDateWithTimezone } from "@/utils/dates";
import { format } from "date-fns";
import { useRouter } from "next/navigation";

export function NewMemorie() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const createMemory = useCallback(async () => {
    try {
      setIsLoading(true);

      const now = format(
        getDateWithTimezone(new Date()),
        "yyyy-MM-dd HH:mm:ss",
      );

      const response = await api.post("/memories", {
        title: "Nova Memória",
        content: "Escreva aqui...",
        event_date: now,
        user_id: 1,
      });
      console.log({
        title: "Nova Memória",
        content: "Escreva aqui...",
        event_date: now,
        user_id: 1,
      });

      const memoryId = response.data.id;
      router.push(`/memory/${memoryId}`);
    } catch (err) {
      console.error("Erro ao criar memória:", err);
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  return (
    <Button
      disabled={isLoading}
      onClick={createMemory}
      className="w-full cursor-pointer bg-violet-500 text-white !transition-all"
    >
      {isLoading ? (
        <Loader className="animate-spin" />
      ) : (
        <div className="flex items-center gap-1">
          <PlusIcon width={16} />
          <p>Adicionar Memória</p>
        </div>
      )}
    </Button>
  );
}
