import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EditButtonProps {
  onClick?: () => void;
}

export function EditButton({ onClick }: EditButtonProps) {
  return (
    <Button
      onClick={onClick}
      variant="ghost"
      size="sm"
      className="flex w-full cursor-pointer items-center justify-center text-white hover:bg-zinc-700 hover:text-white"
    >
      <Pencil className="mr-2 h-4 w-4" />
      Editar
    </Button>
  );
}
