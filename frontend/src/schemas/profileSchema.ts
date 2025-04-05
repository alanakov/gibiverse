import { z } from "zod";

export const profileSchema = z.object({
  name: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
  email: z.string().email("E-mail inválido").min(1, "O e-mail é obrigatório"),
  cpf: z.string().optional(),
});

export type ProfileSchemaType = z.infer<typeof profileSchema>;
