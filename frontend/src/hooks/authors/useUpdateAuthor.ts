import { useState } from "react";
import { UpdateAuthorSchemaType } from "@/schemas/authorSchema";
import { updateAuthor } from "@/http/authors/updateAuthor";
import { toast } from "sonner";

export function useUpdateAuthor(id: number, onSuccess?: () => void) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleUpdateAuthor = async (data: UpdateAuthorSchemaType) => {
    try {
      setIsSubmitting(true);
      await updateAuthor(id, data);
      toast.success("Autor atualizado com sucesso!");
      onSuccess?.();
    } catch (error) {
      toast.error("Erro ao atualizar autor");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    handleUpdateAuthor,
    isSubmitting,
  };
}
