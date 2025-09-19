import { z } from "zod";

export const settingsSchema = z.object({
  username: z
    .string()
    .min(3, "O nome deve ter no mínimo 3 caracteres")
    .or(z.literal(""))
    .optional(),
  lastname: z
    .string()
    .min(3, "O sobrenome deve ter no mínimo 3 caracteres")
    .or(z.literal(""))
    .optional(),
  email: z.string().email("E-mail inválido").or(z.literal("")).optional(),
  password: z
    .string()
    .min(6, "A senha deve ter no mínimo 6 caracteres")
    .or(z.literal(""))
    .optional(),
});

export type SettingsSchema = z.infer<typeof settingsSchema>;
