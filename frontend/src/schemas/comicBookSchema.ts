import { z } from "zod";

export const createComicBookSchema = z.object({
  title: z.string().min(3, "O título deve ter pelo menos 3 caracteres"),
  description: z
    .string()
    .min(10, "A descrição deve ter pelo menos 10 caracteres"),
  coverUrl: z.string().url("URL inválida"),
  collectionId: z.number().optional(),
  genreId: z.number({
    required_error: "O gênero é obrigatório",
  }),
  authorId: z.number({
    required_error: "O autor é obrigatório",
  }),
});

export const updateComicBookSchema = createComicBookSchema;

export type CreateComicBookSchemaType = z.infer<typeof createComicBookSchema>;
export type UpdateComicBookSchemaType = z.infer<typeof updateComicBookSchema>;
