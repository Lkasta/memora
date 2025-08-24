"use client";

import api from "@/lib/api";
import { MemorieType } from "@/types/Memorie";
import { formatMemorieDateDetailed } from "@/utils/dates";
import { ChevronLeft } from "lucide-react";
import { useEffect, useState, use } from "react";

interface MemoriePageProps {
  params: Promise<{ id: string }>;
}

export default function Memory({ params }: MemoriePageProps) {
  const { id } = use(params);
  const [memorie, setMemorie] = useState<MemorieType>();

  useEffect(() => {
    async function fetchMemories() {
      try {
        const { data } = await api.get(`/memories/${id}`);
        setMemorie(data);
      } catch (error) {
        console.error("Erro ao buscar memória:", error);
      }
    }

    fetchMemories();
  }, [id]);

  return (
    <div className="flex w-full flex-col text-gray-800">
      <div className="grid h-[60px] grid-cols-3 items-center border-b px-6 py-3">
        <div className="flex items-center gap-2 text-gray-700">
          <ChevronLeft size={16} />
          <h1 className="text-sm font-bold">{memorie?.title}</h1>
        </div>
        <h1 className="text-center text-sm font-bold text-gray-500">
          {formatMemorieDateDetailed(memorie?.event_date || new Date())}
        </h1>
      </div>
      <div className="px-12 py-6">
        <h1 className="text-[32px] font-bold">{memorie?.title}</h1>
        <p>{memorie?.content}</p>
      </div>
    </div>
  );
}
