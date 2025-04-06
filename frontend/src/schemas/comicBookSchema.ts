import { z } from "zod";

export const createComicBookSchema = z.object({
  title: z.string().min(1, "Título é obrigatório"),
  description: z.string(),
  authorId: z.number().min(1, "O autor é obrigatório"),
  coverUrl: z
    .string()
    .url("URL da imagem de capa inválida")
    .min(1, "URL da imagem de capa é obrigatória"),
});

export type CreateComicBookSchemaType = z.infer<typeof createComicBookSchema>;

export const updateComicBookSchema = createComicBookSchema;

export type UpdateComicBookSchemaType = z.infer<typeof updateComicBookSchema>;
