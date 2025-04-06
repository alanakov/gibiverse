import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { GenreRow } from "./GenreRow";
import { Genre } from "@/types/genre";

type GenresTableProps = {
  genres: Genre[];
  onDelete?: (id: number) => void;
  onEdit?: (genre: Genre) => void;
  currentPage?: number;
};

export function GenresTable({
  genres,
  onDelete,
  onEdit,
  currentPage,
}: GenresTableProps) {
  const hasGenres = genres.length > 0;

  return (
    <div className="w-full overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead className="text-center">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {hasGenres ? (
            genres.map((genre) => (
              <GenreRow
                key={genre.id}
                genre={genre}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={2} className="text-center">
                Nenhum gênero foi encontrado.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {currentPage && (
        <p className="text-muted-foreground mt-4 text-sm">
          Exibindo página {currentPage}
        </p>
      )}
    </div>
  );
}
