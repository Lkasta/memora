import { MemoGhost } from "../MemoGhost";

export function AuthAside() {
  return (
    <div className="relative h-full w-full overflow-hidden bg-violet-500">
      <MemoGhost
        size="full"
        className="absolute -bottom-[10%] left-1/2 mt-[20%] h-auto w-[90%] -translate-x-1/2 xl:-bottom-[20%] xl:w-[80%]"
        fillColor="fill-violet-600"
      />
    </div>
  );
}
