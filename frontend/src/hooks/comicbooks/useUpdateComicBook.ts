import { useState } from "react";
import { EditComicBookSchemaType } from "@/schemas/comicBookSchema";
import { toast } from "sonner";
import { updateComicBook } from "@/http/comicBooks/updateComicBook";

export function useUpdateComicBook(id: number, onSuccess?: () => void) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleUpdateComicBook = async (data: EditComicBookSchemaType) => {
    try {
      setIsSubmitting(true);
      await updateComicBook(id, data);
      toast.success("ComicBook atualizado com sucesso!");
      onSuccess?.();
    } catch (error) {
      console.error("Erro ao atualizar comicBook:", error);
      toast.error("Erro ao atualizar comicBook");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    handleUpdateComicBook,
    isSubmitting,
  };
}
