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
    <div className="w-full overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-zinc-800">
            <TableHead className="text-zinc-400">Nome</TableHead>
            <TableHead className="text-zinc-400">Biografia</TableHead>
            <TableHead className="text-center text-zinc-400">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
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
            <TableRow className="flex">
              <TableCell colSpan={3}>Nenhum autor foi encontrado.</TableCell>
            </TableRow>
          )}
          <p className="text-muted-foreground mb-4 text-sm">
            Exibindo página {currentPage}
          </p>
        </TableBody>
      </Table>
    </div>
  );
}
