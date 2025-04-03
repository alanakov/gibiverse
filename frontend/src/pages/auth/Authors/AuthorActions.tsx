import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { EditButton } from "../../../components/custom/EditButton";
import { DeleteButton } from "../../../components/custom/DeleteButton";
import { Author } from "./types";
import { MoreHorizontal } from "lucide-react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { UpdateAuthorForm } from "./UpdateAuthorForm";

interface AuthorActionsProps {
  author: Author;
  onEdit: (author: Author) => void;
  onDelete: (id: number) => void;
}

export function AuthorActions({
  author,
  onEdit,
  onDelete,
}: AuthorActionsProps) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            className="cursor-pointer bg-(--background-color) hover:bg-zinc-700"
            size="icon"
          >
            <MoreHorizontal className="h-4 w-4 text-white" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="border-0 bg-zinc-800">
          <EditButton onClick={() => setIsEditing(true)} />
          <DeleteButton author={author} onDelete={onDelete} />
        </DropdownMenuContent>
      </DropdownMenu>

      <Sheet open={isEditing} onOpenChange={setIsEditing}>
        <SheetContent className="border-0 bg-(--background-color) p-6">
          <h2 className="text-lg font-semibold text-white">Editar Autor</h2>
          <UpdateAuthorForm
            author={author}
            onSave={(data) => {
              onEdit({ ...author, ...data });
              setIsEditing(false);
            }}
          />
        </SheetContent>
      </Sheet>
    </>
  );
}
