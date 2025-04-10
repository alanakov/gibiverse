import { useEffect, useState } from "react";
import { getAuthorById } from "@/http/authors/getAuthorById";
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
import { useAuthors } from "@/hooks/authors/useAuthors";
import { useDeleteAuthor } from "@/hooks/authors/useDeleteAuthor";
import { Author } from "@/types/author";
import { toast } from "sonner";

export function AuthorsPage() {
  const { authors, currentPage, totalPages, fetchAuthors, setCurrentPage } =
    useAuthors();
  const { handleDeleteAuthor } = useDeleteAuthor(fetchAuthors);
  const [selectedAuthorToEdit, setSelectedAuthorToEdit] =
    useState<Author | null>(null);

  useEffect(() => {
    fetchAuthors();
  }, [currentPage]);

  const handleCloseSheet = () => {
    setSelectedAuthorToEdit(null);
  };

  const handleEdit = async (id: number) => {
    try {
      const author = await getAuthorById(id);
      setSelectedAuthorToEdit(author);
    } catch (error) {
      toast.error("Erro ao buscar autor");
    }
  };

  return (
    <div className="flex min-h-screen w-full">
      <div className="flex flex-1 flex-col space-y-10 p-10">
        <AuthorsHeader onAuthorCreated={fetchAuthors} />
        <div className="flex flex-1 flex-col justify-between">
          <AuthorsTable
            authors={authors}
            onDelete={handleDeleteAuthor}
            onEdit={(author) => handleEdit(author.id)}
            currentPage={currentPage}
          />

          <Sheet open={!!selectedAuthorToEdit} onOpenChange={handleCloseSheet}>
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
                    handleCloseSheet();
                    fetchAuthors();
                  }}
                  onCancel={handleCloseSheet}
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
