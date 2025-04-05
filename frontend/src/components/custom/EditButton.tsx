import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";

export function EditButton() {
  return (
    <Button
      variant="ghost"
      className="flex w-full cursor-pointer items-center text-white hover:bg-zinc-700 hover:text-white"
    >
      <Pencil className="mr-2" />
      Editar
    </Button>
  );
}
