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
import { ComicBook } from "@/types/comicBook";

interface ComicBookActionsProps {
  comicBook: ComicBook;
  onEdit?: (comicBook: ComicBook) => void;
  onDelete?: (id: number) => void;
}

export function ComicBookActions({
  comicBook,
  onEdit,
  onDelete,
}: ComicBookActionsProps) {
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
        <DropdownMenuItem onSelect={() => onEdit?.(comicBook)}>
          <EditButton />
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()} asChild>
          <DeleteButton
            itemName={comicBook.title}
            onDelete={() => onDelete?.(comicBook.id)}
          />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
