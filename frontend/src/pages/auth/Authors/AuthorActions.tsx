import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { EditButton } from "@/components/custom/EditButton";
import { DeleteButton } from "@/components/custom/DeleteButton";
import { Author } from "@/pages/auth/Authors/types";

interface AuthorActionsProps {
  author: Author;
  onEdit?: (author: Author) => void;
  onDelete?: (id: number) => void;
}

export function AuthorActions({
  author,
  onEdit,
  onDelete,
}: AuthorActionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="cursor-pointer hover:bg-zinc-700 hover:text-white"
        >
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="rounded-md bg-zinc-800">
        <DropdownMenuItem onSelect={() => onEdit?.(author)}>
          <EditButton />
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => onDelete?.(author.id)}>
          <DeleteButton
            itemName={author.name}
            onDelete={() => onDelete?.(author.id)}
          />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
