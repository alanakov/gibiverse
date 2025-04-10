import { useState } from "react";
import { CreateAuthorSchemaType } from "@/schemas/authorSchema";
import { createAuthor } from "@/http/authors/createAuthor";
import { toast } from "sonner";

export function useCreateAuthor(onSuccess?: () => void) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreateAuthor = async (data: CreateAuthorSchemaType) => {
    try {
      setIsSubmitting(true);
      await createAuthor(data);
      toast.success("Autor criado com sucesso!");
      onSuccess?.();
    } catch (error) {
      toast.error("Erro ao criar autor");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    handleCreateAuthor,
    isSubmitting,
  };
}
