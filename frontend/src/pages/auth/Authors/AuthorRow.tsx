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
      <TableCell className="w-[200px] max-w-[200px] truncate overflow-hidden whitespace-nowrap">
        {author.name}
      </TableCell>
      <TableCell className="w-[300px] max-w-[300px] truncate overflow-hidden whitespace-nowrap">
        {author.bio}
      </TableCell>
      <TableCell className="w-[100px] text-center">
        <AuthorActions author={author} onEdit={onEdit} onDelete={onDelete} />
      </TableCell>
    </TableRow>
  );
}
