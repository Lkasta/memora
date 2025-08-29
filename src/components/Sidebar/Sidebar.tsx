"use client";
import { MemorieItemSidebar } from "./components/MemorieItemSidebar";
import { NewMemorie } from "./components/NewMemorie";
import { useMemories } from "@/service/memories/memories.hook";
import { Loader } from "../Loader";
import { Logo } from "./components/Logo";
import { MemorieType } from "@/types/Memorie";
import { format, parse } from "date-fns";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { ptBR } from "date-fns/locale";

interface GroupMemorieProps {
  date: string;
  memories: MemorieType[];
}

interface GroupMemoriesProps {
  group: GroupMemorieProps[];
}

export function Sidebar() {
  const { data: memories, isLoading } = useMemories();

  const data = memories?.reduce(
    (acc, memorie) => {
      const dateKey = format(memorie.event_date, "yyyy-MM");
      const dateItem = acc.group.find((m) => m.date === dateKey);

      if (dateItem) {
        dateItem.memories.push(memorie);
      } else {
        acc.group.push({
          date: dateKey,
          memories: [memorie],
        });
      }

      return acc;
    },
    { group: [] } as GroupMemoriesProps,
  );

  if (isLoading) {
    return (
      <div className="flex h-screen w-full max-w-72 flex-col items-center justify-center border-r">
        <Loader complement="memórias" />
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full max-w-72 flex-col border-r">
      <div className="flex flex-col gap-3 px-6 pt-3">
        <Logo />
      </div>
      <h1 className="mx-6 mt-3 font-bold text-gray-700">Minhas Memórias</h1>
      <div className="min-h-0 flex-1 overflow-y-auto">
        <Accordion
          defaultValue={data?.group.map((memory) => memory.date)}
          type="multiple"
        >
          {data?.group.map((memory) => {
            const date = parse(memory.date, "yyyy-MM", new Date());
            return (
              <AccordionItem
                key={memory.date}
                value={memory.date}
                className="border-0"
              >
                <AccordionTrigger
                  chevronClassName="text-gray-300 !transition-all"
                  className="group mx-6 cursor-pointer gap-1 pt-3 pb-1.5 hover:no-underline"
                >
                  <span className="text-xs font-bold text-gray-300 capitalize group-hover:underline">
                    {format(date, "MMMM yy", { locale: ptBR })}
                  </span>
                  <span className="mr-auto text-xs font-bold text-gray-300 capitalize group-hover:underline">
                    ({memory.memories.length})
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pb-0">
                  {memory.memories.map((memorie) => {
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
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>
      <div className="mt-auto flex flex-col gap-3 px-6 py-3">
        <NewMemorie />
      </div>
      <div className="flex items-center gap-2 border-t px-6 py-3">
        <div className="!h-8 !w-8 rounded-full bg-gray-300" />
        <div className="select-none">
          <p className="text-sm">Jonas</p>
          <p className="text-xs">jonas@memora.com</p>
        </div>
      </div>
    </div>
  );
}
