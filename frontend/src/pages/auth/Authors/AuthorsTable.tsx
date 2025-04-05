import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AuthorRow } from "./AuthorRow";
import { Author } from "./types";

type AuthorsTableProps = {
  authors: Author[];
  onDelete?: (id: number) => void;
  onEdit?: (author: Author) => void;
  currentPage?: number;
};

export function AuthorsTable({
  authors,
  onDelete,
  onEdit,
  currentPage,
}: AuthorsTableProps) {
  const hasAuthors = authors.length > 0;

  return (
    <div className="w-full overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Biografia</TableHead>
            <TableHead className="text-center">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {hasAuthors ? (
            authors.map((author) => (
              <AuthorRow
                key={author.id}
                author={author}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={3} className="text-center">
                Nenhum autor foi encontrado.
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
