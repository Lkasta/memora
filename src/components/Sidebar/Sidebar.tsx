"use client";
import api from "@/lib/api";
import { MemorieType } from "@/types/Memorie";
import { useEffect, useState } from "react";
import { MemorieItemSidebar } from "./MemorieItemSidebar";
import { NewMemorie } from "./NewMemorie";

export function Sidebar() {
  const [memories, setMemories] = useState<MemorieType[]>([]);

  useEffect(() => {
    async function fetchMemories() {
      try {
        const { data } = await api.get("/memories");
        setMemories(data);
      } catch (error) {
        console.error("Erro ao buscar memórias:", error);
      }
    }

    fetchMemories();
  }, []);

  return (
    <div className="flex h-screen w-full max-w-72 flex-col border-r">
      <div className="px-6 py-3 text-2xl font-bold text-gray-800">
        <span className="text-violet-500">me</span>mora
      </div>
      <div className="px-6 py-3">
        <NewMemorie />
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto">
        <span className="px-6 text-xs font-bold text-gray-300">
          Dezembro 25
        </span>
        <div className="flex w-full flex-col">
          {memories.map((memorie) => {
            return (
              <MemorieItemSidebar
                key={memorie.id}
                id={memorie.id}
                title={memorie.title}
                content={memorie.content}
                event_date={memorie.event_date}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
