import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  useDeleteMemorie,
  useUpdateMemorie,
} from "@/service/memories/memories.hook";
import { formatMemorieDateDetailed } from "@/utils/dates";
import { ChevronLeft, Loader2Icon, Settings2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { DeleteMemoryConfirm } from "./DeleteMemoryConfirm";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { PopoverContent } from "@/components/tiptap-ui-primitive/popover";
import { Calendar } from "@/components/ui/calendar";
type Props = {
  image: string | null;
  eventDate: Date;
  isSaving: boolean;
  title: string;
};

export function MemoryHeader({ eventDate, isSaving, title }: Props) {
  const router = useRouter();
  const params = useParams();
  const { mutate: deleteMemory, isPending } = useDeleteMemorie();
  const updateMemorie = useUpdateMemorie();

  const memorieId = params.id;

  function handleDelete(id: number) {
    deleteMemory({ id });
    router.push("/");
  }

  return (
    <div className="flex flex-col">
      <div className="grid h-15 flex-shrink-0 grid-cols-3 items-center border-b px-6 py-3">
        {/* Lado esquerdo: Botão de voltar e Título */}
        <div className="flex min-w-0 items-center gap-2 overflow-hidden text-gray-700">
          <Button
            variant="ghost"
            onClick={router.back}
            className="flex min-w-0 max-w-full cursor-pointer items-center gap-2 !p-0 !transition-all hover:bg-transparent hover:text-gray-700"
          >
            <ChevronLeft className="flex-shrink-0" size={16} />
            <span className="truncate text-sm font-bold">
              {title || "Sem título"}
            </span>
          </Button>
          {isSaving && (
            <Loader2Icon className="flex-shrink-0 animate-spin" size={12} />
          )}
        </div>

        {/* Centro: Data */}
        <div className="flex min-w-0 items-center justify-center">
          <Popover>
            <PopoverTrigger className="flex min-w-0 max-w-full items-center justify-center">
              <h1 className="cursor-pointer truncate text-center text-sm font-bold text-gray-500 hover:underline">
                {formatMemorieDateDetailed(eventDate)}
              </h1>
            </PopoverTrigger>
            <PopoverContent>
              <Calendar
                className="rounded-lg border shadow-lg"
                mode="single"
                selected={eventDate}
                defaultMonth={eventDate}
                captionLayout="dropdown"
                onSelect={(date) => {
                  if (date) {
                    updateMemorie.mutate({
                      id: Number(memorieId),
                      payload: { event_date: date.toISOString() },
                    });
                  }
                }}
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Lado direito: Opções */}
        <div className="flex items-center justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="cursor-pointer !transition-all"
              >
                <Settings2 size={16} />
                <span className="hidden sm:inline">Opções</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mr-3">
              <DropdownMenuLabel>Ações da memória</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DeleteMemoryConfirm
                isPending={isPending}
                onConfirm={() => handleDelete(Number(memorieId))}
              />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
