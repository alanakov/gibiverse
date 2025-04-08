import { useEffect, useState } from "react";
import { DashboardSidebar } from "@/components/custom/DashboardSidebar";
import { DashboardPagination } from "@/components/custom/DashboardPagination";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useComicBooks } from "@/hooks/comicbooks/useComicBooks";
import { useDeleteComicBook } from "@/hooks/comicbooks/useDeleteComicBook";
import { ComicBook } from "@/types/comicBook";
import { ComicBooksTable } from "./ComicBooksTable";
import { UpdateComicBookForm } from "./UpdateComicBookForm";
import { getComicBookById } from "@/http/comicBooks/getComicBookById";
import { ComicBooksHeader } from "./ComicBookHeader";

export function ComicBooksPage() {
  const {
    comicBooks,
    currentPage,
    totalPages,
    fetchComicBooks,
    setCurrentPage,
  } = useComicBooks();

  const { handleDeleteComicBook } = useDeleteComicBook(fetchComicBooks);

  const [selectedComicBookToEdit, setSelectedComicBookToEdit] =
    useState<ComicBook | null>(null);

  useEffect(() => {
    fetchComicBooks();
  }, [currentPage]);

  const handleEdit = async (id: number) => {
    try {
      const comicBook = await getComicBookById(id);
      setSelectedComicBookToEdit(comicBook);
    } catch (error) {
      console.error("Erro ao buscar gibi:", error);
    }
  };

  const handleCloseSheet = () => {
    setSelectedComicBookToEdit(null);
  };

  return (
    <div className="flex min-h-screen w-full">
      <DashboardSidebar />
      <div className="flex flex-1 flex-col space-y-10 p-10">
        <ComicBooksHeader onComicBookCreated={fetchComicBooks} />
        <div className="flex flex-1 flex-col justify-between">
          <ComicBooksTable
            comicBooks={comicBooks}
            onDelete={handleDeleteComicBook}
            onEdit={(comicBook) => handleEdit(comicBook.id)}
            currentPage={currentPage}
          />

          <Sheet
            open={!!selectedComicBookToEdit}
            onOpenChange={handleCloseSheet}
          >
            <SheetContent className="border-0 bg-(--background-color) p-4 sm:max-w-md">
              <SheetHeader>
                <SheetTitle className="text-white">Editar Gibi</SheetTitle>
                <SheetDescription>
                  Atualize as informações do gibi abaixo.
                </SheetDescription>
              </SheetHeader>
              {selectedComicBookToEdit && (
                <UpdateComicBookForm
                  comicBook={selectedComicBookToEdit}
                  onSuccess={() => {
                    handleCloseSheet();
                    fetchComicBooks();
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
