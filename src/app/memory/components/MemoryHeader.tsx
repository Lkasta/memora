import { MemorieType } from "@/types/Memorie";
import { formatMemorieDateDetailed } from "@/utils/dates";
import { ChevronLeft } from "lucide-react";

type Props = {
  memorie: MemorieType;
  isSaving: boolean;
  title: string;
};

export function MemoryHeader({ memorie, isSaving, title }: Props) {
  return (
    <div className="grid h-14 flex-shrink-0 grid-cols-3 items-center border-b px-6 py-3">
      <div className="flex items-center gap-2 text-gray-700">
        <ChevronLeft size={16} />
        <span className="text-sm font-bold">{title || "Sem título"}</span>
        {isSaving && (
          <span className="ml-2 text-xs text-gray-400">Salvando...</span>
        )}
      </div>
      <h1 className="text-center text-sm font-bold text-gray-500">
        {formatMemorieDateDetailed(memorie?.event_date || new Date())}
      </h1>
    </div>
  );
}
