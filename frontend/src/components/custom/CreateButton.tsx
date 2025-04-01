import { Button } from "@/components/ui/button";
import { SheetClose } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

interface CreateButtonProps {
  name?: string;
  className?: string;
  disabled?: boolean;
}

export function CreateButton({ name, className, disabled }: CreateButtonProps) {
  return (
    <SheetClose asChild>
      <Button
        type="submit"
        className={cn("cursor-pointer bg-red-500 hover:bg-red-700", className)}
        disabled={disabled}
      >
        Criar {name}
      </Button>
    </SheetClose>
  );
}
