import { Button } from "@/components/ui/button";
import { formatMemorieDateDetailed } from "@/utils/dates";
import { ChevronLeft, Loader2Icon } from "lucide-react";
import { useRouter } from "next/navigation";

type Props = {
  eventDate: Date;
  isSaving: boolean;
  title: string;
};

export function MemoryHeader({ eventDate, isSaving, title }: Props) {
  const router = useRouter();

  return (
    <div className="grid h-14 flex-shrink-0 grid-cols-3 items-center border-b px-6 py-3">
      <div className="flex items-center gap-2 text-gray-700">
        <Button
          variant="ghost"
          onClick={router.back}
          className="flex cursor-pointer items-center gap-2 !p-0 !transition-all hover:bg-transparent hover:text-gray-700"
        >
          <ChevronLeft size={16} />
          <span className="text-sm font-bold">{title || "Sem título"}</span>
          {isSaving && <Loader2Icon className="animate-spin" size={12} />}
        </Button>
      </div>
      <h1 className="text-center text-sm font-bold text-gray-500">
        {formatMemorieDateDetailed(eventDate)}
      </h1>
    </div>
  );
}
