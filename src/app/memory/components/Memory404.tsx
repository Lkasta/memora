import { MemoGhost } from "@/components/MemoGhost";

export function Memory404() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-4 text-center text-gray-300 select-none">
      <MemoGhost variant="404" />
      <h1 className="mt-5 text-6xl font-bold">404</h1>
      <p className="max-w-52 text-sm">
        Crie uma nova memória ou selecione uma para continuar.
      </p>
    </div>
  );
}
