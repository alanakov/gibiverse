import { useState } from "react";
import { deleteAuthor } from "@/http/authors/deleteAuthor";
import { toast } from "sonner";

export function useDeleteAuthor(onSuccess?: () => void) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteAuthor = async (id: number) => {
    try {
      setIsDeleting(true);
      await deleteAuthor(id);
      toast.success("Autor excluído com sucesso!");
      onSuccess?.();
    } catch (error) {
      toast.error("Erro ao excluir autor");
    } finally {
      setIsDeleting(false);
    }
  };

  return {
    handleDeleteAuthor,
    isDeleting,
  };
}
