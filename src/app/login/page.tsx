"use client";

import { AuthAside } from "@/components/Auth/AuthAside";
import { AuthLogo } from "@/components/Auth/AuthLogo";
import { Loader } from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLogin } from "@/hooks/use-login";
import Link from "next/link";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { mutate: login, isPending } = useLogin();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login({ email, password });
  };

  return (
    <div className="grid h-screen w-full grid-cols-2">
      <div className="flex h-full w-full items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="m-2 flex w-full max-w-[400px] flex-col gap-3"
        >
          <AuthLogo />
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <Label htmlFor="email">E-mail</Label>
              <Input
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="jonas@example.com"
                className="focus:border-0"
              />
            </div>

            <div className="flex flex-col gap-1">
              <Label htmlFor="password">Senha</Label>
              <Input
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
              href="/login"
              className="text-sm font-medium text-gray-700 hover:underline"
            >
              Esqueceu a sua senha
            </Link>
          </div>
          <Button
            disabled={isPending}
            className="cursor-pointer bg-violet-500 !transition-all"
          >
            {isPending ? <Loader /> : "Entrar"}
          </Button>
        </form>
      </div>
      <AuthAside />
    </div>
  );
}
