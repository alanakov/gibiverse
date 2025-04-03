import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EditButtonProps {
  onClick: () => void;
  label?: string;
}

export function EditButton({ onClick, label = "Editar" }: EditButtonProps) {
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={onClick}
      className="flex w-[100%] cursor-pointer items-center text-white hover:bg-zinc-700 hover:text-white"
    >
      <Pencil className="mr-2" />
      {label}
    </Button>
  );
}
