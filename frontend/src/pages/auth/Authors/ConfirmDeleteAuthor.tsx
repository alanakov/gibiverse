import { ConfirmDelete } from "@/components/custom/ConfirmDelete";
import { Trash2 } from "lucide-react";

interface ConfirmDeleteAuthorProps {
  authorName: string;
  onDelete: () => void;
}

export function ConfirmDeleteAuthor({
  authorName,
  onDelete,
}: ConfirmDeleteAuthorProps) {
  return (
    <ConfirmDelete itemName={authorName} onDelete={onDelete}>
      {(openDialog) => (
        <button
          onClick={openDialog}
          className="text-red-500 hover:text-red-700"
        >
          <Trash2 className="h-5 w-5" />
        </button>
      )}
    </ConfirmDelete>
  );
}
