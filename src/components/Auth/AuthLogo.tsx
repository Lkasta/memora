import { MemoGhost } from "../MemoGhost";

export function AuthLogo() {
  return (
    <div className="mb-3 flex items-center gap-2 select-none">
      <MemoGhost fillColor="fill-violet-500" className="-mb-1" size={35} />
      <h1 className="text-5xl font-bold text-gray-800">
        <span className="text-violet-500">me</span>mora
      </h1>
    </div>
  );
}
