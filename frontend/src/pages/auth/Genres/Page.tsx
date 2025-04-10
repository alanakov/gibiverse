import { useEffect, useState } from "react";
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
import { useGenres } from "@/hooks/genres/useGenres";
import { useDeleteGenre } from "@/hooks/genres/useDeleteGenre";
import { Genre } from "@/types/genre";
import { getGenreById } from "@/http/genres/getGenreById";
import { UpdateGenreForm } from "./UpdateGenreForm";
import { toast } from "sonner";

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

  const handleCloseSheet = () => {
    setSelectedGenreToEdit(null);
  };

  const handleEdit = async (id: number) => {
    try {
      const genre = await getGenreById(id);
      setSelectedGenreToEdit(genre);
    } catch (error) {
      toast.error("Erro ao buscar gênero");
    }
  };

  return (
    <div className="flex min-h-screen w-full">
      <div className="flex flex-1 flex-col space-y-10 p-10">
        <GenresHeader onGenreCreated={fetchGenres} />
        <div className="flex flex-1 flex-col justify-between">
          <GenresTable
            genres={genres}
            onDelete={handleDeleteGenre}
            onEdit={(genre) => handleEdit(genre.id)}
            currentPage={currentPage}
          />

          <Sheet open={!!selectedGenreToEdit} onOpenChange={handleCloseSheet}>
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
                    handleCloseSheet();
                    fetchGenres();
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
