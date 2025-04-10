import { useState } from "react";
import { createGenre } from "@/http/genres/createGenre";
import { toast } from "sonner";
import { CreateGenreSchemaType } from "@/schemas/genreSchema";

export function useCreateGenre(onSuccess?: () => void) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreateGenre = async (data: CreateGenreSchemaType) => {
    try {
      setIsSubmitting(true);
      await createGenre(data);
      toast.success("Gênero criado com sucesso!");
      onSuccess?.();
    } catch (error) {
      toast.error("Erro ao criar gênero");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    handleCreateGenre,
    isSubmitting,
  };
}
