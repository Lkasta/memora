import { Loader2Icon, PlusIcon } from "lucide-react";
import { Button } from "../ui/button";
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
        content: "Conteúdo da memória",
        event_date: now,
        user_id: 1,
      });

      router.push(`/memory/${data.id}`);
    } catch (err) {
      console.log("Erro ao criar memória:", err);
    }
  }

  return (
    <Button
      disabled={createMemorie.isPending}
      onClick={handleCreate}
      className="w-full cursor-pointer bg-violet-500 text-white !transition-all"
    >
      {createMemorie.isPending ? (
        <Loader2Icon className="animate-spin" />
      ) : (
        <div className="flex items-center gap-1">
          <PlusIcon width={16} />
          <p>Adicionar Memória</p>
        </div>
      )}
    </Button>
  );
}
