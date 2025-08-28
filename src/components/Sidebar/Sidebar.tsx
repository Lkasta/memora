"use client";
import { MemorieItemSidebar } from "./components/MemorieItemSidebar";
import { NewMemorie } from "./components/NewMemorie";
import { useMemories } from "@/service/memories/memories.hook";
import { Loader } from "../Loader";
import { Logo } from "./components/Logo";

export function Sidebar() {
  const { data: memories, isLoading } = useMemories();

  if (isLoading) {
    return (
      <div className="flex h-screen w-full max-w-72 flex-col items-center justify-center border-r">
        <Loader complement="memórias" />
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full max-w-72 flex-col border-r">
      <div className="flex flex-col px-6 pt-3 gap-3">
        <Logo />
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
