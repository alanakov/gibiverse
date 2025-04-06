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
import { Collection } from "@/types/collection";

interface CollectionActionsProps {
  collection: Collection;
  onEdit?: (collection: Collection) => void;
  onDelete?: (id: number) => void;
}

export function CollectionActions({
  collection,
  onEdit,
  onDelete,
}: CollectionActionsProps) {
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
        <DropdownMenuItem onSelect={() => onEdit?.(collection)}>
          <EditButton />
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()} asChild>
          <DeleteButton
            itemName={collection.name}
            onDelete={() => onDelete?.(collection.id)}
          />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
