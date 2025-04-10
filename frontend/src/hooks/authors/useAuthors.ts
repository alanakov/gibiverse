import { useState, useCallback } from "react";
import { toast } from "sonner";
import { Author } from "@/types/author";
import { getAllAuthors } from "@/http/authors/getAllAuthors";

export function useAuthors(initialPage = 1, pageSize = 10) {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const fetchAuthors = useCallback(async () => {
    if (isLoaded) return;
    try {
      setIsLoading(true);
      const data = await getAllAuthors(currentPage, pageSize);
      setAuthors(data.data);
      setTotalPages(data.totalPages);
      setIsLoaded(true);
    } catch (error) {
      toast.error("Erro ao carregar autores");
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, pageSize, isLoaded]);

  return {
    authors,
    currentPage,
    totalPages,
    isLoading,
    setCurrentPage,
    fetchAuthors,
  };
}
