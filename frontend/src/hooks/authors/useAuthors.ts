import { useState } from "react";
import { getAllAuthors } from "@/http/authors/getAllAuthors";
import { toast } from "sonner";
import { Author } from "@/types/author";

export function useAuthors(initialPage = 1, pageSize = 10) {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const fetchAuthors = async () => {
    try {
      setIsLoading(true);
      const data = await getAllAuthors(currentPage, pageSize);
      setAuthors(data.data);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Erro ao buscar autores:", error);
      toast.error("Erro ao carregar autores");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    authors,
    currentPage,
    totalPages,
    isLoading,
    setCurrentPage,
    fetchAuthors,
  };
}
