import { Author } from "@/types/author";
import { AuthorActions } from "./AuthorActions";
import { TableCell, TableRow } from "@/components/ui/table";

interface AuthorRowProps {
  author: Author;
  onEdit?: (author: Author) => void;
  onDelete?: (id: number) => void;
}

export function AuthorRow({ author, onEdit, onDelete }: AuthorRowProps) {
  return (
    <TableRow className="hover:bg-zinc-800">
      <TableCell>{author.name}</TableCell>
      <TableCell>{author.bio}</TableCell>
      <TableCell className="text-center">
        <AuthorActions author={author} onEdit={onEdit} onDelete={onDelete} />
      </TableCell>
    </TableRow>
  );
}
