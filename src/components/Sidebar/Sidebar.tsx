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
import { useAuth } from "@/store/useAuth";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import SidebarProfile from "./components/SidebarProfile";
import Link from "next/link";
import { Cog, LifeBuoy } from "lucide-react";

interface GroupMemorieProps {
  date: string;
  memories: MemorieType[];
}

interface GroupMemoriesProps {
  group: GroupMemorieProps[];
}

export function Sidebar() {
  const { data: memories, isLoading } = useMemories();
  const { user } = useAuth();
  const params = useParams();
  const router = useRouter();
  const auth = useAuth();

  const memorieId = Number(params.id);

  const [openedAccordions, setOpenedAccordions] = useState<string[]>([]);

  function handleLogout() {
    auth.logout();
    router.push("/login");
  }

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

  useEffect(() => {
    if (memories && memories.length > 0) {
      const dates = Array.from(
        new Set(memories.map((memory) => format(memory.event_date, "yyyy-MM"))),
      );
      setOpenedAccordions(dates);
    }
  }, [memories]);

  if (isLoading) {
    return (
      <div className="flex h-screen w-full max-w-72 flex-col items-center justify-center border-r">
        <Loader complement="memórias" />
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full max-w-72 flex-col border-r">
      <div className="flex flex-col gap-3 px-4 pt-3">
        <Logo />
      </div>

      <div className="mt-3 flex w-full items-center justify-between px-4 text-gray-700">
        <h1 className="font-bold">Minhas Memórias</h1>
        <NewMemorie />
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto">
        <Accordion
          value={openedAccordions}
          onValueChange={setOpenedAccordions}
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
                  className="group mx-4 cursor-pointer gap-1 pt-3 pb-1.5 hover:no-underline"
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
                        image={memorie.image}
                        key={memorie.id}
                        id={memorie.id}
                        title={memorie.title}
                        content={memorie.content}
                        event_date={memorie.event_date}
                        active={memorie.id == memorieId}
                      />
                    );
                  })}
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>

      <div className="flex flex-col gap-2 border-t py-3 px-4">
        <Link
          target="_blank"
          href="https://lkasta.com"
          className="flex items-center gap-2 rounded-sm px-2 py-1.5 text-gray-700 !transition-colors hover:bg-violet-200 hover:text-violet-600"
        >
          <LifeBuoy size={20} />
          <span className="text-sm font-medium">Projetos</span>
        </Link>

        <Link
          href="/settings"
          className="flex items-center gap-2 rounded-sm bg-violet-100 px-2 py-1.5 text-violet-500 !transition-colors hover:bg-violet-200 hover:text-violet-600"
        >
          <Cog size={20} />
          <span className="text-sm font-medium">Configurações</span>
        </Link>
      </div>

      {user && (
        <SidebarProfile
          handleLogout={handleLogout}
          username={user.username}
          email={user.email}
        />
      )}
    </div>
  );
}
