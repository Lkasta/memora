"use client";
import { MemorieItemSidebar } from "./MemorieItemSidebar";
import { NewMemorie } from "./NewMemorie";
import Link from "next/link";
import { useMemories } from "@/service/memories/memories.hook";
import { Loader2Icon } from "lucide-react";

export function Sidebar() {
  const { data: memories, isLoading } = useMemories();

  if (isLoading) {
    return (
      <div className="flex h-screen w-full max-w-72 flex-col items-center justify-center border-r">
        <div className="flex items-center gap-2">
          <p className="text-sm text-nowrap">Carregando Memórias</p>
          <Loader2Icon className="animate-spin" size={12} />
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full max-w-72 flex-col border-r">
      <Link
        href="/"
        className="px-6 py-3 text-2xl font-bold text-gray-800 select-none"
      >
        <span className="text-violet-500">me</span>mora
      </Link>
      <div className="px-6 py-3">
        <NewMemorie />
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto">
        <span className="px-6 text-xs font-bold text-gray-300">
          Dezembro 25
        </span>
        <div className="flex w-full flex-col">
          {memories?.map((memorie) => {
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
