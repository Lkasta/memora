"use client";

import { AuthAside } from "@/components/Auth/AuthAside";
import { AuthLogo } from "@/components/Auth/AuthLogo";
import { Loader } from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRegisterUser } from "@/hooks/use-register";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

import { registerSchema, RegisterSchema } from "./schemaRegister";
import { AxiosError } from "axios";
import { useState } from "react";
export default function Register() {
  const [successMessage, setSuccessMessage] = useState("");
  const { mutate: register, isPending } = useRegisterUser();

  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  function onSubmit(values: RegisterSchema) {
    register(values, {
      onError: (error: unknown) => {
        const axiosError = error as AxiosError<{ error: string }>;

        const apiMessage =
          axiosError.response?.data?.error || "Erro ao registrar usuário";

        form.setError("root", {
          type: "manual",
          message: apiMessage,
        });
      },
      onSuccess: () => {
        form.reset();
        setSuccessMessage("Conta criada com sucesso! Faça login.");
      },
    });
  }

  return (
    <div className="grid h-screen w-full grid-cols-2">
      <div className="flex h-full w-full flex-col items-center justify-center">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="m-2 flex w-full max-w-[400px] flex-col gap-3"
          >
            <AuthLogo />

            {successMessage && (
              <div className="rounded-md border border-green-500 bg-green-100 p-2 text-sm text-green-700">
                {successMessage}
              </div>
            )}

            {form.formState.errors.root && (
              <div className="rounded-md border border-red-500 bg-red-100 p-2 text-sm text-red-500">
                {form.formState.errors.root.message}
              </div>
            )}

            <div className="flex flex-col gap-3">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Usuário</FormLabel>
                    <FormControl>
                      <Input placeholder="Seu nome de usuário" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-mail</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Insira seu e-mail"
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
                        autoComplete="new-password"
                        placeholder="Utilize uma senha forte"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirme sua senha</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        autoComplete="new-password"
                        placeholder="Confirme a sua senha"
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
                href="/login"
                className="text-sm font-medium text-violet-500 hover:underline"
              >
                Já tem uma conta
              </Link>
            </div>

            <Button
              type="submit"
              disabled={isPending}
              className="cursor-pointer bg-violet-500 !transition-all"
            >
              {isPending ? <Loader /> : "Criar conta"}
            </Button>
          </form>
        </Form>
      </div>
      <AuthAside />
    </div>
  );
}
