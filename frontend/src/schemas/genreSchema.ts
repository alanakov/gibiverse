import { z } from "zod";

export const createGenreSchema = z.object({
  name: z
    .string()
    .min(3, "O nome deve ter pelo menos 3 caracteres")
    .max(50, "O nome deve ter no máximo 50 caracteres")
    .trim(),
});

export type CreateGenreSchemaType = z.infer<typeof createGenreSchema>;

export const updateGenreSchema = createGenreSchema;

export type UpdateGenreSchemaType = z.infer<typeof updateGenreSchema>;
