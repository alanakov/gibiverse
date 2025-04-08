import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
      <DropdownMenuTrigger>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="cursor-pointer hover:bg-zinc-700 hover:text-white"
        >
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        sideOffset={5}
        className="rounded-md border-0 bg-zinc-800"
      >
        <DropdownMenuItem asChild>
          <EditButton onClick={() => onEdit?.(comicBook)} />
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
