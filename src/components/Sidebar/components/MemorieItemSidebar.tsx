import { MemoGhost } from "@/components/MemoGhost";
import { MemorieType } from "@/types/Memorie";
import { formatMemorieDate } from "@/utils/dates";
import clsx from "clsx";
import Image from "next/image";
import { useRouter } from "next/navigation";

type MemorieSidebarType = Pick<
  MemorieType,
  "title" | "content" | "event_date" | "id" | "image"
>;

interface Props extends MemorieSidebarType {
  active: boolean;
}

export function MemorieItemSidebar({
  id,
  active,
  title,
  event_date,
  content,
  image,
}: Props) {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/memory/${id}`)}
      className="flex cursor-pointer items-center gap-3 border-b px-6 py-1.5 transition-all hover:bg-gray-100"
    >
      <div
        className={clsx(
          "relative !h-10 !w-10 overflow-hidden rounded-lg",
          active ? "bg-violet-200" : "bg-gray-200",
        )}
      >
        {image ? (
          <Image
            width={100}
            height={100}
            src={`data:image/jpeg;base64,${image}`}
            alt="thumbnail"
            className="absolute top-0 left-0 h-full w-full object-cover"
          />
        ) : (
          <MemoGhost
            size="full"
            className="absolute -bottom-[20%] left-1/2 h-auto w-[80%] -translate-x-1/2"
            fillColor={active ? "fill-violet-300" : "fill-gray-300"}
          />
        )}
      </div>
      <div className="flex min-w-0 flex-1 flex-col select-none">
        <div className="flex gap-1">
          <h1 className="truncate text-xs font-bold text-gray-700">{title}</h1>
          <p className="text-xs font-semibold text-nowrap text-gray-500">
            • {formatMemorieDate(new Date(event_date))}
          </p>
        </div>
        <p className="truncate text-xs text-gray-500">
          {content.replace(/<[^>]+>/g, "").slice(0, 40)}
        </p>
      </div>
    </div>
  );
}
