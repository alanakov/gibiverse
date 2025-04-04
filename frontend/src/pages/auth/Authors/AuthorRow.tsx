import { DeleteButton } from "@/components/custom/DeleteButton";
import { Author } from "./types";
import { TableCell, TableRow } from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";

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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onEdit?.(author)}>
              Editar
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <DeleteButton
                itemName={author.name}
                onDelete={() => onDelete?.(author.id)}
              />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}
