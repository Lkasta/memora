import { MemorieType } from "@/types/Memorie";
import { formatMemorieDate } from "@/utils/dates";

type MemorieSidebarType = Pick<MemorieType, "title" | "content" | "event_date">;

export function MemorieSidebar({
  title,
  event_date,
  content,
}: MemorieSidebarType) {
  return (
    <div className="flex items-center gap-3 border-b px-6 py-1.5">
      <div className="!h-10 !w-10 rounded-lg bg-gray-300" />
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex gap-1">
          <h1 className="truncate text-xs font-bold text-gray-700">{title}</h1>
          <p className="text-xs font-semibold text-nowrap text-gray-500">
            • {formatMemorieDate(event_date)}
          </p>
        </div>
        <p className="truncate text-xs text-gray-500">{content}</p>
      </div>
    </div>
  );
}
