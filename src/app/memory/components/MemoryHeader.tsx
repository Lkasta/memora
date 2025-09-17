import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDeleteMemorie } from "@/service/memories/memories.hook";
import { formatMemorieDateDetailed } from "@/utils/dates";
import { ChevronLeft, Loader2Icon, Settings2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { DeleteMemoryConfirm } from "./DeleteMemoryConfirm";

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

  const memorieId = params.id;

  function handleDelete(id: number) {
    deleteMemory({ id });
    router.push("/");
  }

  return (
    <div className="flex flex-col">
      <div className="grid h-15 flex-shrink-0 grid-cols-3 items-center border-b px-6 py-3">
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
        <h1 className="text-center text-sm font-bold text-gray-500">
          {formatMemorieDateDetailed(eventDate)}
        </h1>

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
