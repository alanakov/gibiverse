import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AuthorsTableProps } from "./types";
import { AuthorRow } from "./AuthorRow";

export function AuthorsTable({
  authors = [
    { id: 1, name: "Stan Lee", bio: "Criador de vários heróis da Marvel." },
    { id: 2, name: "Mauricio de Sousa", bio: "Criador da Turma da Mônica." },
  ],
  onDelete,
  onEdit,
}: AuthorsTableProps) {
  console.log("Authors:", authors);

  return (
    <div className="w-[1500px] overflow-x-auto">
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
            <TableRow>
              <TableCell colSpan={3} className="p-4 text-center">
                Nenhum autor encontrado.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
