import { MemorieType } from "@/types/Memorie";
import { formatMemorieDate } from "@/utils/dates";
import Link from "next/link";

type MemorieSidebarType = Pick<
  MemorieType,
  "title" | "content" | "event_date" | "id"
>;

export function MemorieItemSidebar({
  id,
  title,
  event_date,
  content,
}: MemorieSidebarType) {
  return (
    <Link
      href={`/memory/${id}`}
      className="flex cursor-pointer items-center gap-3 border-b px-6 py-1.5 transition-all hover:bg-gray-100"
    >
      <div className="!h-10 !w-10 rounded-lg bg-gray-300" />
      <div className="flex min-w-0 flex-1 flex-col select-none">
        <div className="flex gap-1">
          <h1 className="truncate text-xs font-bold text-gray-700">{title}</h1>
          <p className="text-xs font-semibold text-nowrap text-gray-500">
            • {formatMemorieDate(event_date)}
          </p>
        </div>
        <p className="truncate text-xs text-gray-500">{content}</p>
      </div>
    </Link>
  );
}
