import { z } from "zod";

export const createAuthorSchema = z.object({
  name: z.string().min(2, "O nome deve ter pelo menos 2 caracteres"),
  bio: z.string().min(10, "A biografia deve ter pelo menos 10 caracteres"),
});

export type CreateAuthorSchemaType = z.infer<typeof createAuthorSchema>;

export const editAuthorSchema = createAuthorSchema;

export type EditAuthorSchemaType = z.infer<typeof editAuthorSchema>;
