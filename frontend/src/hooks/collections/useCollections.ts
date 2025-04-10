import { getAllCollections } from "@/http/collections/getAllColletions";
import { Collection } from "@/types/collection";
import { useState } from "react";
import { toast } from "sonner";

export function useCollections(initialPage = 1, pageSize = 10) {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [collections, setCollections] = useState<Collection[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const fetchCollections = async () => {
    try {
      setIsLoading(true);
      const data = await getAllCollections(currentPage, pageSize);
      setCollections(data.data);
      setTotalPages(data.totalPages);
    } catch (error) {
      toast.error("Erro ao carregar coleções");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    collections,
    currentPage,
    totalPages,
    isLoading,
    setCurrentPage,
    fetchCollections,
  };
}
