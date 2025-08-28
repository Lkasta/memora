import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function Logo() {
  const router = useRouter();
  
  return (
    <Button
      variant="ghost"
      onClick={() => router.push("/")}
      className="h-min w-min cursor-pointer gap-0 p-0 text-2xl font-bold text-gray-800 !transition-all select-none hover:bg-transparent hover:text-gray-900"
    >
      <span className="text-violet-500">me</span>mora
    </Button>
  );
}
