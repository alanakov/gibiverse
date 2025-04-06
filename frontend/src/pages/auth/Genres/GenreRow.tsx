import { Genre } from "@/types/genre";
import { GenreActions } from "./GenreActions";
import { TableCell, TableRow } from "@/components/ui/table";

interface GenreRowProps {
  genre: Genre;
  onEdit?: (genre: Genre) => void;
  onDelete?: (id: number) => void;
}

export function GenreRow({ genre, onEdit, onDelete }: GenreRowProps) {
  return (
    <TableRow className="hover:bg-zinc-800">
      <TableCell>{genre.name}</TableCell>
      <TableCell className="text-center">
        <GenreActions genre={genre} onEdit={onEdit} onDelete={onDelete} />
      </TableCell>
    </TableRow>
  );
}
