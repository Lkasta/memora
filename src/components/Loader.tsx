import { Loader2Icon } from "lucide-react";

export function Loader({ complement = "" }) {
  return (
    <div className="flex h-screen w-full items-center justify-center gap-2 select-none">
      <p className="text-sm">Carregando {complement}</p>
      <Loader2Icon className="animate-spin" size={16} />
    </div>
  );
}
