import Link from "next/link";
import { Cog } from "lucide-react";
import { usePathname } from "next/navigation";

export default function SettingsButton() {
  const pathname = usePathname();
  const route = "/settings";

  return (
    <Link
      href={route}
      className={`flex items-center gap-2 rounded-sm px-2 py-1.5 !transition-colors hover:bg-violet-200 hover:text-violet-600 ${pathname.includes(route) && "bg-violet-100 text-violet-500"}`}
    >
      <Cog size={20} />
      <span className="text-sm font-medium">Configurações</span>
    </Link>
  );
}
