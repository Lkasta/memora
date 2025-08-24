"use client";

import { useState, useEffect } from "react";
import api from "@/lib/api";
import { MemorieType } from "@/types/Memorie";

export function Stories() {
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
    <div className="flex flex-col gap-2">
      {memories.map((memorie, i) => (
        <div
          key={i}
          className="flex max-w-96 flex-col gap-1 rounded border p-4"
        >
          <div className="">
            <h1 className="font-medium">{memorie.title}</h1>
            <span></span>
          </div>
          <p className="">{memorie.content}</p>
        </div>
      ))}
    </div>
  );
}
