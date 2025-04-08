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
import { Genre } from "@/types/genre";

interface GenreActionsProps {
  genre: Genre;
  onEdit?: (genre: Genre) => void;
  onDelete?: (id: number) => void;
}

export function GenreActions({ genre, onEdit, onDelete }: GenreActionsProps) {
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
          <EditButton onClick={() => onEdit?.(genre)} />
        </DropdownMenuItem>

        <DropdownMenuItem onSelect={(e) => e.preventDefault()} asChild>
          <DeleteButton
            itemName={genre.name}
            onDelete={() => onDelete?.(genre.id)}
          />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
