import { z } from "zod";

export const registerSchema = z
  .object({
    username: z
      .string()
      .min(3, "O nome de usuário deve ter no mínimo 3 caracteres")
      .max(24, "O nome de usuário deve ter no máximo 24 caracteres"),
    email: z.string().email("E-mail inválido"),
    password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
    confirmPassword: z
      .string()
      .min(6, "A senha deve ter pelo menos 6 caracteres"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "As senhas não coincidem",
  });

export type RegisterSchema = z.infer<typeof registerSchema>;
