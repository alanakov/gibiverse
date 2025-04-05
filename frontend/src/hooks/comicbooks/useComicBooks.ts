import { useState } from "react";
import { ComicBook } from "@/types/comicBook";
import { toast } from "sonner";
import { getAllComicBooks } from "@/http/comicBooks/getAllComicBooks";

export function useComicBooks(initialPage = 1, pageSize = 10) {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [comicBooks, setComicBooks] = useState<ComicBook[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const fetchComicBooks = async () => {
    try {
      setIsLoading(true);
      const data = await getAllComicBooks(currentPage, pageSize);
      setComicBooks(data.data);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Erro ao buscar comicBooks:", error);
      toast.error("Erro ao carregar comicBooks");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    comicBooks,
    currentPage,
    totalPages,
    isLoading,
    setCurrentPage,
    fetchComicBooks,
  };
}
