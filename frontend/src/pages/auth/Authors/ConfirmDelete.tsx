import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { ReactNode, useState } from "react";

interface ConfirmDeleteProps {
  itemName: string;
  onDelete: () => void;
  children: (openDialog: () => void) => ReactNode;
}

export function ConfirmDelete({
  itemName,
  onDelete,
  children,
}: ConfirmDeleteProps) {
  const [open, setOpen] = useState(false);

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      {children(() => setOpen(true))}
      <AlertDialogContent className="border-0 bg-(--background-color)">
        <AlertDialogHeader>
          <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
          <AlertDialogDescription>
            Tem certeza que deseja excluir <strong>{itemName}</strong>? Essa
            ação não pode ser desfeita.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            className="cursor-pointer bg-(--background-color)"
            onClick={() => setOpen(false)}
          >
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction
            className="cursor-pointer border-0 bg-red-500 hover:bg-red-700"
            onClick={() => {
              onDelete();
              setOpen(false);
            }}
          >
            Excluir
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
