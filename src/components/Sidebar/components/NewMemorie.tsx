import { Loader2Icon, Plus } from "lucide-react";
import { Button } from "../../ui/button";
import { getDateWithTimezone } from "@/utils/dates";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { useCreateMemorie } from "@/service/memories/memories.hook";

export function NewMemorie() {
  const createMemorie = useCreateMemorie();
  const router = useRouter();

  async function handleCreate() {
    try {
      const now = format(
        getDateWithTimezone(new Date()),
        "yyyy-MM-dd HH:mm:ss",
      );

      const data = await createMemorie.mutateAsync({
        title: "Minha memória",
        content: "",
        event_date: now,
        user_id: 1,
      });

      router.push(`/memory/${data.id}`);
    } catch (err) {
      console.error("Erro ao criar memória:", err);
    }
  }

  return (
    <Button
      disabled={createMemorie.isPending}
      onClick={handleCreate}
      variant="ghost"
      className="h-min !cursor-pointer !p-0 !transition-all hover:bg-transparent"
    >
      {createMemorie.isPending ? (
        <Loader2Icon className="animate-spin" />
      ) : (
        <Plus />
      )}
    </Button>
  );
}
