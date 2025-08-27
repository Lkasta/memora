import { PlusIcon } from "lucide-react";
import { Button } from "../ui/button";

export function NewMemorie() {
  return (
    <Button className="w-full  bg-violet-500 text-white cursor-pointer !transition-all">
      <PlusIcon width={16} />
      Adicionar Memória
    </Button>
  );
}
