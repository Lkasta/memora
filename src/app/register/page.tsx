"use client";

import { AuthAside } from "@/components/Auth/AuthAside";
import { AuthLogo } from "@/components/Auth/AuthLogo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLogin } from "@/hooks/use-login";
import Link from "next/link";
import { useState } from "react";

export default function Login() {
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confrimPassword, setConfirmPassword] = useState("");
  const login = useLogin();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login.mutate({ email, password });
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
              <Label htmlFor="user">Nome de usuário</Label>
              <Input
                name="user"
                type="text"
                value={user}
                onChange={(e) => setUser(e.target.value)}
                placeholder="Informe seu nome de usuário"
                className="focus:border-0"
              />
            </div>

            <div className="flex flex-col gap-1">
              <Label htmlFor="userEmail">E-mail</Label>
              <Input
                name="userEmail"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Insira seu e-mail"
                className="focus:border-0"
              />
            </div>

            <div className="flex flex-col gap-1">
              <Label htmlFor="userPassword">Senha</Label>
              <Input
                name="userPassword"
                type="password"
                value={password}
                autoComplete="new-password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Utilize uma senha forte"
                className="focus:border-0"
              />
            </div>

            <div className="flex flex-col gap-1">
              <Label htmlFor="userPassword">Senha</Label>
              <Input
                name="consfirmUserPassword"
                type="password"
                value={confrimPassword}
                autoComplete="new-password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirme a sua senha"
                className="focus:border-0"
              />
            </div>
          </div>

          <div className="flex w-full items-center justify-between">
            <Link
              href="/login"
              className="text-sm font-medium text-violet-500 hover:underline"
            >
              Já tem uma conta
            </Link>
          </div>
          <Button className="cursor-pointer bg-violet-500 !transition-all">
            Criar conta
          </Button>
        </form>
      </div>
      <AuthAside />
    </div>
  );
}
