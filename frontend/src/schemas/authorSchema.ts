import { z } from "zod";

export const createAuthorSchema = z.object({
  name: z
    .string()
    .min(3, "O nome deve ter pelo menos 3 caracteres")
    .max(100, "O nome deve ter no máximo 100 caracteres")
    .regex(/^[^0-9]+$/, "O nome não pode conter números")
    .trim(),
  bio: z
    .string()
    .min(10, "A biografia deve ter pelo menos 10 caracteres")
    .max(1000, "A biografia deve ter no máximo 1000 caracteres")
    .trim(),
  coverUrl: z.string().url("URL inválida"),
});

export type CreateAuthorSchemaType = z.infer<typeof createAuthorSchema>;

export const updateAuthorSchema = createAuthorSchema;

export type UpdateAuthorSchemaType = z.infer<typeof updateAuthorSchema>;
