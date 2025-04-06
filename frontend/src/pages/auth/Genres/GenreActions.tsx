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
import { Genre } from "@/types/genre";

interface GenreActionsProps {
  genre: Genre;
  onEdit?: (genre: Genre) => void;
  onDelete?: (id: number) => void;
}

export function GenreActions({ genre, onEdit, onDelete }: GenreActionsProps) {
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
        <DropdownMenuItem onSelect={() => onEdit?.(genre)}>
          <EditButton />
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
