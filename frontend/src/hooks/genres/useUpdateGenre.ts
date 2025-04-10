import { updateGenre } from "@/http/genres/updateGenre";
import { UpdateGenreSchemaType } from "@/schemas/genreSchema";
import { useState } from "react";
import { toast } from "sonner";

export function useUpdateGenre(id: number, onSuccess?: () => void) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleUpdateGenre = async (data: UpdateGenreSchemaType) => {
    try {
      setIsSubmitting(true);
      await updateGenre(id, data);
      toast.success("Gênero atualizado com sucesso!");
      onSuccess?.();
    } catch (error) {
      toast.error("Erro ao atualizar gênero");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    handleUpdateGenre,
    isSubmitting,
  };
}
