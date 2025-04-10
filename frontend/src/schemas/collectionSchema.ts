import { z } from "zod";

export const createCollectionSchema = z.object({
  name: z
    .string()
    .min(3, "O nome deve ter pelo menos 3 caracteres")
    .max(100, "O nome deve ter no máximo 100 caracteres")
    .trim(),
  description: z
    .string()
    .max(1000, "A descrição deve ter no máximo 1000 caracteres")
    .optional(),
  coverUrl: z.string().url("URL inválida"),
  authorId: z.number({
    required_error: "O autor é obrigatório",
  }),
});

export type CreateCollectionSchemaType = z.infer<typeof createCollectionSchema>;

export const updateCollectionSchema = createCollectionSchema;
export type UpdateCollectionSchemaType = z.infer<typeof updateCollectionSchema>;
