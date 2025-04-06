import { deleteCollection } from "@/http/collections/deleteCollection";
import { useState } from "react";
import { toast } from "sonner";

export function useDeleteCollection(onSuccess?: () => void) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteCollection = async (id: number) => {
    try {
      setIsDeleting(true);
      await deleteCollection(id);
      toast.success("Coleção excluída com sucesso!");
      onSuccess?.();
    } catch (error) {
      console.error("Erro ao excluir coleção:", error);
      toast.error("Erro ao excluir coleção");
    } finally {
      setIsDeleting(false);
    }
  };

  return {
    handleDeleteCollection,
    isDeleting,
  };
}
