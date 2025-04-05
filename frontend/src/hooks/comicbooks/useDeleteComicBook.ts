import { deleteComicBook } from "@/http/comicBooks/deleteComicBook";
import { useState } from "react";
import { toast } from "sonner";

export function useDeleteComicBook(onSuccess?: () => void) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteComicBook = async (id: number) => {
    try {
      setIsDeleting(true);
      await deleteComicBook(id);
      toast.success("ComicBook excluído com sucesso!");
      onSuccess?.();
    } catch (error) {
      console.error("Erro ao excluir comicBook:", error);
      toast.error("Erro ao excluir comicBook");
    } finally {
      setIsDeleting(false);
    }
  };

  return {
    handleDeleteComicBook,
    isDeleting,
  };
}
