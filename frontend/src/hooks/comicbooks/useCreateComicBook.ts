import { useState } from "react";
import { CreateComicBookSchemaType } from "@/schemas/comicBookSchema";
import { toast } from "sonner";
import { createComicBook } from "@/http/comicBooks/createComicBook";

export function useCreateComicBook(onSuccess?: () => void) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreateComicBook = async (data: CreateComicBookSchemaType) => {
    try {
      setIsSubmitting(true);
      await createComicBook(data);
      toast.success("ComicBook criado com sucesso!");
      onSuccess?.();
    } catch (error) {
      toast.error("Erro ao criar comicBook");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    handleCreateComicBook,
    isSubmitting,
  };
}
