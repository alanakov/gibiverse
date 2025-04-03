import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogTrigger,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface DeleteAuthorProps {
  authorName: string;
  onDelete: () => void;
}

export function DeleteAuthor({ authorName, onDelete }: DeleteAuthorProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="text-red-500 hover:text-red-700">
          <Trash2 size={20} />
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
        <AlertDialogDescription>
          Você tem certeza que deseja excluir o autor{" "}
          <strong>{authorName}</strong>? Essa ação não pode ser desfeita.
        </AlertDialogDescription>
        <div className="mt-4 flex justify-end gap-2">
          <AlertDialogCancel asChild>
            <Button variant="outline">Cancelar</Button>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button variant="destructive" onClick={onDelete}>
              Excluir
            </Button>
          </AlertDialogAction>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
