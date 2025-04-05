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

interface AuthorsTableProps {
  authors: Author[];
  onDelete?: (id: number) => void;
  onEdit?: (author: Author) => void;
  currentPage?: number;
}

export function AuthorsTable({
  authors,
  onDelete,
  onEdit,
  currentPage,
}: AuthorsTableProps) {
  return (
    <div className="w-full max-w-full overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-zinc-800">
            <TableHead className="w-1/3 text-zinc-400">Nome</TableHead>
            <TableHead className="w-1/2 text-zinc-400">Biografia</TableHead>
            <TableHead className="text-center text-zinc-400">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="h-full">
          {authors.length > 0 ? (
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
      <p className="text-muted-foreground mt-4 text-sm">
        Exibindo página {currentPage}
      </p>
    </div>
  );
}
