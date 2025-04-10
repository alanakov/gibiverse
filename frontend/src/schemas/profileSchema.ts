import { z } from "zod";

export const profileSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  email: z.string().email("E-mail inválido"),
  cpf: z.string().nullable(),
});

export type ProfileSchemaType = z.infer<typeof profileSchema>;
