"use client";

import { AuthAside } from "@/components/Auth/AuthAside";
import { AuthLogo } from "@/components/Auth/AuthLogo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLogin } from "@/hooks/use-login";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema, loginSchema } from "./schemaLogin";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Loader2Icon } from "lucide-react";

export default function Login() {
  const { mutate: login, isPending } = useLogin();

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: LoginSchema) {
    login(values);
  }

  return (
    <div className="grid h-screen max-h-screen w-full grid-cols-2">
      <div className="flex h-full w-full items-center justify-center">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="m-2 flex w-full max-w-[400px] flex-col gap-3"
          >
            <AuthLogo />

            <div className="flex flex-col gap-3">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-mail</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="jonas@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="••••••••••••"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
              type="submit"
              disabled={isPending}
              className="cursor-pointer bg-violet-500 !transition-all"
            >
              {isPending ? (
                <Loader2Icon className="animate-spin" size={16} />
              ) : (
                "Entrar"
              )}
            </Button>
          </form>
        </Form>
      </div>
      <AuthAside />
    </div>
  );
}
