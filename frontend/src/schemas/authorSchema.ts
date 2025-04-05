import { z } from "zod";

export const createAuthorSchema = z.object({
  name: z
    .string()
    .min(3, "O nome deve ter pelo menos 3 caracteres")
    .max(100, "O nome deve ter no máximo 100 caracteres")
    .trim(),
  bio: z
    .string()
    .min(10, "A biografia deve ter pelo menos 10 caracteres")
    .max(1000, "A biografia deve ter no máximo 1000 caracteres")
    .trim(),
});

export type CreateAuthorSchemaType = z.infer<typeof createAuthorSchema>;

export const editAuthorSchema = createAuthorSchema;

export type EditAuthorSchemaType = z.infer<typeof editAuthorSchema>;
