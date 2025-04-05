import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ConfirmDelete } from "@/pages/auth/Authors/ConfirmDelete";

interface DeleteButtonProps {
  itemName: string;
  onDelete: () => void;
  label?: string;
}

export function DeleteButton({
  itemName,
  onDelete,
  label = "Excluir",
}: DeleteButtonProps) {
  return (
    <ConfirmDelete itemName={itemName} onDelete={onDelete}>
      {(openDialog) => (
        <Button
          onClick={openDialog}
          variant="ghost"
          size="sm"
          className="flex w-full cursor-pointer items-center text-red-500 hover:bg-zinc-700 hover:text-red-500"
        >
          <Trash2 className="mr-2" />
          {label}
        </Button>
      )}
    </ConfirmDelete>
  );
}
