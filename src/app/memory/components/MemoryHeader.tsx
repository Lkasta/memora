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
      <div className="flex h-15 flex-shrink-0 items-center justify-between border-b px-6 py-3">
        <div className="flex items-center gap-2 text-gray-700">
          <Button
            variant="ghost"
            onClick={router.back}
            className="flex cursor-pointer items-center gap-2 !p-0 !transition-all hover:bg-transparent hover:text-gray-700"
          >
            <ChevronLeft size={16} />
            <span className="text-sm font-bold">{title || "Sem título"}</span>
          </Button>
          {isSaving && <Loader2Icon className="animate-spin" size={12} />}
        </div>

        <Popover>
          <PopoverTrigger className="flex w-full items-center justify-center">
            <h1 className="cursor-pointer text-center text-sm font-bold text-nowrap text-gray-500 hover:underline">
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

        <DropdownMenu>
          <DropdownMenuTrigger asChild className="ml-auto w-min">
            <Button
              variant="ghost"
              className="ml-auto w-min cursor-pointer !transition-all"
            >
              <Settings2 size={16} />
              Opções
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="mr-3">
            <DropdownMenuLabel>Ações da memória</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {/* <DropdownMenuItem>Favoritar</DropdownMenuItem> */}
            <DeleteMemoryConfirm
              isPending={isPending}
              onConfirm={() => handleDelete(Number(memorieId))}
            />
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
