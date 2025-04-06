import { deleteGenre } from "@/http/genres/deleteGenre";
import { useState } from "react";
import { toast } from "sonner";

export function useDeleteGenre(onSuccess?: () => void) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteGenre = async (id: number) => {
    try {
      setIsDeleting(true);
      await deleteGenre(id);
      toast.success("Gênero excluído com sucesso!");
      onSuccess?.();
    } catch (error) {
      console.error("Erro ao excluir gênero:", error);
      toast.error("Erro ao excluir gênero");
    } finally {
      setIsDeleting(false);
    }
  };

  return {
    handleDeleteGenre,
    isDeleting,
  };
}
