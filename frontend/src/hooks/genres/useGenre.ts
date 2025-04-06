import { getAllGenres } from "@/http/genres/getAllGenres";
import { Genre } from "@/types/genre";
import { useState } from "react";
import { toast } from "sonner";

export function useGenres(initialPage = 1, pageSize = 10) {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const fetchGenres = async () => {
    try {
      setIsLoading(true);
      const data = await getAllGenres(currentPage, pageSize);
      setGenres(data.data);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Erro ao buscar gêneros:", error);
      toast.error("Erro ao carregar gêneros");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    genres,
    currentPage,
    totalPages,
    isLoading,
    setCurrentPage,
    fetchGenres,
  };
}
