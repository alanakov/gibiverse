import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CreateButtonProps {
  name?: string;
  className?: string;
  disabled?: boolean;
  children?: React.ReactNode;
  type?: "button" | "submit" | "reset";
}

export function CreateButton({
  name,
  className,
  disabled,
  children,
  type = "submit",
}: CreateButtonProps) {
  return (
    <Button
      type={type}
      className={cn("cursor-pointer bg-red-500 hover:bg-red-700", className)}
      disabled={disabled}
    >
      {children || `Criar ${name}`}
    </Button>
  );
}
