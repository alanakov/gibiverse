import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ComicBookRow } from "./ComicBookRow";
import { ComicBook } from "@/types/comicBook";

type ComicBooksTableProps = {
  comicBooks: ComicBook[];
  onDelete?: (id: number) => void;
  onEdit?: (comicBook: ComicBook) => void;
  currentPage?: number;
};

export function ComicBooksTable({
  comicBooks,
  onDelete,
  onEdit,
  currentPage,
}: ComicBooksTableProps) {
  const hasComicBooks = comicBooks.length > 0;

  return (
    <div className="w-full overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Título</TableHead>
            <TableHead>Descrição</TableHead>
            <TableHead>Autor</TableHead>
            <TableHead>Gênero</TableHead>
            <TableHead>Coleção</TableHead>
            <TableHead className="text-center">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {hasComicBooks ? (
            comicBooks.map((comicBook) => (
              <ComicBookRow
                key={comicBook.id}
                comicBook={comicBook}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="text-center">
                Nenhum gibi foi encontrado.
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
