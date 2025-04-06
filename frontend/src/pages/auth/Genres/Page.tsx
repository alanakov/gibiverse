import { useEffect, useState } from "react";
import { DashboardSidebar } from "@/components/custom/DashboardSidebar";
import { GenresHeader } from "./GenresHeader";
import { GenresTable } from "./GenresTable";
import { DashboardPagination } from "@/components/custom/DashboardPagination";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useGenres } from "@/hooks/genres/useGenre";
import { useDeleteGenre } from "@/hooks/genres/useDeleteGenre";
import { Genre } from "@/types/genre";
import { getGenreById } from "@/http/genres/getGenreById";
import { UpdateGenreForm } from "./UpdateGenreForm";

export function GenresPage() {
  const { genres, currentPage, totalPages, fetchGenres, setCurrentPage } =
    useGenres();
  const { handleDeleteGenre } = useDeleteGenre(fetchGenres);
  const [selectedGenreToEdit, setSelectedGenreToEdit] = useState<Genre | null>(
    null,
  );

  useEffect(() => {
    fetchGenres();
  }, [currentPage]);

  const handleEdit = async (id: number) => {
    try {
      const genre = await getGenreById(id);
      setSelectedGenreToEdit(genre);
    } catch (error) {
      console.error("Erro ao buscar gênero:", error);
    }
  };

  return (
    <div className="flex min-h-screen w-full">
      <DashboardSidebar />
      <div className="flex flex-1 flex-col space-y-10 p-10">
        <GenresHeader onGenreCreated={fetchGenres} />
        <div className="flex flex-1 flex-col justify-between">
          <GenresTable
            genres={genres}
            onDelete={handleDeleteGenre}
            onEdit={(genre) => handleEdit(genre.id)}
          />

          <Sheet
            open={!!selectedGenreToEdit}
            onOpenChange={() => setSelectedGenreToEdit(null)}
          >
            <SheetContent className="border-0 bg-(--background-color) p-4 sm:max-w-md">
              <SheetHeader>
                <SheetTitle className="text-white">Editar Gênero</SheetTitle>
                <SheetDescription>
                  Atualize as informações do gênero abaixo.
                </SheetDescription>
              </SheetHeader>
              {selectedGenreToEdit && (
                <UpdateGenreForm
                  genre={selectedGenreToEdit}
                  onSuccess={() => {
                    fetchGenres();
                    setSelectedGenreToEdit(null);
                  }}
                  onCancel={() => setSelectedGenreToEdit(null)}
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
