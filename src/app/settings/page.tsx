"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useUpadateUser } from "@/service/user/user.hook";
import { useAuth } from "@/store/useAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "lucide-react";
import { useForm } from "react-hook-form";
import { settingsSchema, SettingsSchema } from "./schemaSettings";

export default function Settings() {
  const { user } = useAuth();

  console.log(user);
  const { mutate: updateUser, isPending } = useUpadateUser();

  const form = useForm<SettingsSchema>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      username: "",
      lastname: "",
      email: "",
      password: "",
    },
  });

  const handleSubmit = () => {
    event?.preventDefault();
    console.log("Values: ", form.getValues());
    if (user) {
      const payload = {
        username: form.getValues("username")?.trim(),
        lastname: form.getValues("lastname")?.trim(),
        email: form.getValues("email")?.trim(),
        password: form.getValues("password")?.trim(),
      };

      updateUser({ id: user.id, payload: payload });
    }
  };

  return (
    <div className="m-8 flex w-full flex-col gap-8 !text-gray-700">
      <h1 className="text-22xl font-medium">Configurações</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex w-full flex-col"
        >
          <div className="flex w-full flex-col border-b pb-5">
            <h1 className="text-lg font-medium">Informações pessoais</h1>
            <span className="text-sm text-gray-500">
              Atualize sua foto de perfil e suas informações pessoais aqui.
            </span>
          </div>

          <div className="grid w-full grid-cols-3 gap-6 border-b py-5 2xl:grid-cols-4">
            <h1 className="text-base font-medium">Nome de usuário</h1>
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Nome" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastname"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Sobrenome" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <div className="grid w-full grid-cols-3 gap-6 border-b py-5 2xl:grid-cols-4">
            <h1 className="text-base font-medium">E-mail</h1>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormControl>
                    <Input type="email" placeholder="E-mail" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <div className="grid w-full grid-cols-3 gap-6 border-b py-5 2xl:grid-cols-4">
            <div className="">
              <h1 className="text-base font-medium">Sua foto</h1>
              <span className="text-sm text-gray-500">
                Ela será exibida no seu perfil.
              </span>
            </div>
            <div className="col-span-2 flex gap-6 text-center">
              <div className="">
                <div className="!h-16 !w-16 rounded-full bg-violet-100">
                  foto
                </div>
              </div>
              <div className="group flex w-full flex-col items-center rounded-lg border px-6 py-4 !transition-colors select-none hover:bg-zinc-50">
                <div className="w-min rounded-full border-8 border-gray-50 bg-gray-100 p-2 !transition-colors group-hover:border-violet-50 group-hover:bg-violet-100">
                  <User className="text-zinc-600 !transition-colors group-hover:text-violet-500" />
                </div>
                <p>
                  <span className="font-bold text-violet-500">
                    Clique para o upload
                  </span>{" "}
                  ou arraste e solte aqui
                </p>
                <span className="text-sm">
                  SVG, PNG, JPG or GIF (max. 1200x800px)
                </span>
              </div>
            </div>
          </div>

          <div className="grid w-full grid-cols-3 items-center gap-6 border-b py-5 2xl:grid-cols-4">
            <div className="">
              <h1 className="text-base font-medium">Senha</h1>
              <span className="text-sm text-gray-500">
                Informe sua senha atual e sua nova senha.
              </span>
            </div>
            <Input type="password" placeholder="Sua senha atual" />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Nova senha"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <div className="flex w-full justify-end gap-3 py-5">
            <Button
              onClick={() => form.reset()}
              variant="outline"
              className="!cursor-pointer !transition-colors"
            >
              Cancelar
            </Button>
            <Button
              disabled={isPending}
              type="submit"
              className="!cursor-pointer bg-violet-500 text-white !transition-colors hover:bg-violet-600"
            >
              Salvar
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
