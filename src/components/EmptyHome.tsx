import { MemoGhost } from "./MemoGhost";

export function EmptyHome() {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <MemoGhost />
      <div className="text-center select-none">
        <p className="max-w-52 text-sm text-gray-300">
          Crie uma nova memória ou selecione uma para continuar.
        </p>
      </div>
    </div>
  );
}
