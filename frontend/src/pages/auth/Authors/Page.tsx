import { deleteAuthor } from "@/http/authors/deleteAuthor";
import { useEffect, useState } from "react";
import { Author } from "./types";
import { getAllAuthors } from "@/http/authors/getAllAuthors";
import { DashboardSidebar } from "@/components/custom/DashboardSidebar";
import { AuthorsHeader } from "./AuthorsHeader";
import { AuthorsTable } from "./AuthorsTable";
import { DashboardPagination } from "@/components/custom/DashboardPagination";

export function AuthorsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [totalPages, setTotalPages] = useState(1);

  const fetchData = async () => {
    try {
      const data = await getAllAuthors(currentPage, 10);
      setAuthors(data.data);
      setTotalPages(data.totalPages);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const handleDelete = async (id: number) => {
    try {
      await deleteAuthor(id);
      fetchData();
    } catch (error) {
      console.error("Erro ao deletar autor:", error);
    }
  };

  return (
    <div className="flex h-screen w-screen">
      <DashboardSidebar />
      <div className="flex h-full flex-col space-y-10 pt-10 pr-10 pb-10 pl-10">
        <AuthorsHeader />
        <div className="flex h-full flex-col justify-between">
          <AuthorsTable
            authors={authors}
            onDelete={handleDelete}
            currentPage={currentPage}
          />
          <DashboardPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
}
