import { MemoGhost } from "@/components/MemoGhost";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

type Props = {
  handleLogout: () => void;
  username: string;
  email: string;
};

export default function SidebarProfile({
  handleLogout,
  username,
  email,
}: Props) {
  return (
    <div className="flex items-center justify-between gap-2 border-t px-6 py-3">
      <div className="flex items-center gap-3">
        <div className="relative !h-10 !w-10 overflow-hidden rounded-full bg-gray-200">
          <MemoGhost
            size="full"
            className="absolute -bottom-[20%] left-1/2 h-auto w-[80%] -translate-x-1/2"
            fillColor="fill-gray-300"
          />
        </div>
        <div className="select-none">
          <p className="text-sm font-semibold">{username || "Username"}</p>
          <p className="text-muted-foreground text-xs">
            {email || "email@memora.com"}
          </p>
        </div>
      </div>
      <Button
        onClick={() => handleLogout()}
        variant="ghost"
        className="cursor-pointer !p-0 !transition-all hover:bg-transparent hover:text-rose-500"
      >
        <LogOut size={16} />
      </Button>
    </div>
  );
}
