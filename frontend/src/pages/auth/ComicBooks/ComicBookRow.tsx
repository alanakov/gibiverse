import { ComicBook } from "@/types/comicBook";
import { ComicBookActions } from "./ComicBookActions";
import { TableCell, TableRow } from "@/components/ui/table";

interface ComicBookRowProps {
  comicBook: ComicBook;
  onEdit?: (comicBook: ComicBook) => void;
  onDelete?: (id: number) => void;
}

export function ComicBookRow({
  comicBook,
  onEdit,
  onDelete,
}: ComicBookRowProps) {
  return (
    <TableRow className="hover:bg-zinc-800">
      <TableCell>{comicBook.title}</TableCell>
      <TableCell>{comicBook.description}</TableCell>
      <TableCell className="text-center">
        <ComicBookActions
          comicBook={comicBook}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </TableCell>
    </TableRow>
  );
}
