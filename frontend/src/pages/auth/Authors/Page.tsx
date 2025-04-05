import { deleteAuthor } from "@/http/authors/deleteAuthor";
import { useEffect, useState } from "react";
import { Author } from "./types";
import { getAllAuthors } from "@/http/authors/getAllAuthors";
import { DashboardSidebar } from "@/components/custom/DashboardSidebar";
import { AuthorsHeader } from "./AuthorsHeader";
import { AuthorsTable } from "./AuthorsTable";
import { DashboardPagination } from "@/components/custom/DashboardPagination";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { UpdateAuthorForm } from "./UpdateAuthorForm";

export function AuthorsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [totalPages, setTotalPages] = useState(1);

  const [selectedAuthorToEdit, setSelectedAuthorToEdit] =
    useState<Author | null>(null);

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
    <div className="flex min-h-screen w-full">
      <DashboardSidebar />
      <div className="flex flex-1 flex-col space-y-10 p-10">
        <AuthorsHeader onAuthorCreated={fetchData} />
        <div className="flex flex-1 flex-col justify-between">
          <AuthorsTable
            authors={authors}
            onDelete={handleDelete}
            currentPage={currentPage}
            onEdit={(author) => setSelectedAuthorToEdit(author)}
          />

          <Sheet
            open={!!selectedAuthorToEdit}
            onOpenChange={() => setSelectedAuthorToEdit(null)}
          >
            <SheetContent className="border-0 bg-(--background-color) p-4 sm:max-w-md">
              <SheetHeader>
                <SheetTitle className="text-white">Editar Autor</SheetTitle>
                <SheetDescription>
                  Atualize as informações do autor abaixo.
                </SheetDescription>
              </SheetHeader>
              {selectedAuthorToEdit && (
                <UpdateAuthorForm
                  author={selectedAuthorToEdit}
                  onSuccess={() => {
                    fetchData();
                    setSelectedAuthorToEdit(null);
                  }}
                  onCancel={() => setSelectedAuthorToEdit(null)}
                />
              )}
            </SheetContent>
          </Sheet>
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
