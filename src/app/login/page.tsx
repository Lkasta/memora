import { MemoGhost } from "@/components/MemoGhost";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function Login() {
  return (
    <div className="grid h-screen w-full grid-cols-2">
      <div className="flex h-full w-full items-center justify-center">
        <div className="m-2 flex w-full max-w-[400px] flex-col gap-3">
          <h1 className="mb-3 text-5xl font-bold text-gray-800">
            <span className="text-violet-500">me</span>mora
          </h1>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <Label htmlFor="email">E-mail</Label>
              <Input
                name="email"
                type="email"
                placeholder="jonas@example.com"
                className="focus:border-0"
              />
            </div>

            <div className="flex flex-col gap-1">
              <Label htmlFor="password">Senha</Label>
              <Input
                name="password"
                type="password"
                placeholder="••••••••••••"
                className="focus:border-0"
              />
            </div>
          </div>
          <div className="flex w-full items-center justify-between">
            <Link
              href="/register"
              className="text-sm font-medium text-violet-500 hover:underline"
            >
              Cadastre-se
            </Link>

            <Link
              href="/register"
              className="text-sm font-medium text-gray-700 hover:underline"
            >
              Esqueceu a sua senha
            </Link>
          </div>
          <Button className="cursor-pointer bg-violet-500 !transition-all">
            Entrar
          </Button>
        </div>
      </div>
      <div className="relative h-full w-full overflow-hidden bg-violet-500">
        <MemoGhost
          size="full"
          className="absolute -bottom-[10%] xl:-bottom-[20%] left-1/2 h-auto w-[90%] xl:w-[80%] -translate-x-1/2 mt-[20%]"
          fillColor="fill-violet-600"
        />
      </div>
    </div>
  );
}
