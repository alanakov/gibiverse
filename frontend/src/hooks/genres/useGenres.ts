import { Genre } from "@/types/genre";
import { useState, useCallback } from "react";
import { toast } from "sonner";
import { getAllGenres } from "@/http/genres/getAllGenres";

export function useGenres(initialPage = 1, pageSize = 10) {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const fetchGenres = useCallback(async () => {
    if (isLoaded) return;
    try {
      setIsLoading(true);
      const data = await getAllGenres(currentPage, pageSize);
      setGenres(data.data);
      setTotalPages(data.totalPages);
      setIsLoaded(true);
    } catch (error) {
      console.error("Erro ao buscar gêneros:", error);
      toast.error("Erro ao carregar gêneros");
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, pageSize, isLoaded]);

  return {
    genres,
    currentPage,
    totalPages,
    isLoading,
    setCurrentPage,
    fetchGenres,
  };
}
