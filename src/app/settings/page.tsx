"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useUpadateUser } from "@/service/user/user.hook";
import { useAuth } from "@/store/useAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { settingsSchema, SettingsSchema } from "./schemaSettings";
import UserImageInput from "./components/settings";

export default function Settings() {
  const { user } = useAuth();

  const { mutate: updateUser, isPending } = useUpadateUser();

  const form = useForm<SettingsSchema>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      username: "",
      lastname: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleSubmit = () => {
    event?.preventDefault();
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
                <FormItem className="mb-auto">
                  <FormControl>
                    <Input placeholder="Nome" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastname"
              render={({ field }) => (
                <FormItem className="mb-auto">
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
                  <FormMessage />
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
              <UserImageInput
                disabled={false}
                onChange={() => console.log("jonas")}
              />
            </div>
          </div>

          <div className="grid w-full grid-cols-3 items-center gap-6 border-b py-5 2xl:grid-cols-4">
            <div className="">
              <h1 className="text-base font-medium">Senha</h1>
              <span className="text-sm text-gray-500">
                Informe sua senha atual e sua nova senha.
              </span>
            </div>
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="mb-auto">
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Nova senha"
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
                <FormItem className="mb-auto">
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Nova senha"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
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
