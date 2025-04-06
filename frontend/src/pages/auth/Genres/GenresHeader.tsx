import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { CreateButton } from "@/components/custom/CreateButton";
import { CreateGenreForm } from "./CreateGenreForm";

interface GenresHeaderProps {
  onGenreCreated?: () => void;
}

export function GenresHeader({ onGenreCreated }: GenresHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-bold">Gêneros</h1>
      <Sheet>
        <SheetTrigger>
          <CreateButton name="Gênero" />
        </SheetTrigger>
        <SheetContent className="border-0 bg-(--background-color) p-4 sm:max-w-md">
          <SheetHeader>
            <SheetTitle className="text-white">Criar Novo Gênero</SheetTitle>
            <SheetDescription>
              Preencha os campos abaixo para criar um novo gênero.
            </SheetDescription>
          </SheetHeader>
          <CreateGenreForm onSuccess={onGenreCreated} onCancel={() => {}} />
        </SheetContent>
      </Sheet>
    </div>
  );
}
