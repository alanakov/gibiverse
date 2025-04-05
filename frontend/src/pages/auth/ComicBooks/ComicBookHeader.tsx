import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { CreateButton } from "@/components/custom/CreateButton";
import { CreateComicBookForm } from "./CreateComicBookForm";

interface ComicBooksHeaderProps {
  onComicBookCreated?: () => void;
}

export function ComicBooksHeader({ onComicBookCreated }: ComicBooksHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-bold">Gibis</h1>
      <Sheet>
        <SheetTrigger>
          <CreateButton name="Gibi" />
        </SheetTrigger>
        <SheetContent className="border-0 bg-(--background-color) p-4 sm:max-w-md">
          <SheetHeader>
            <SheetTitle className="text-white">Criar Novo Gibi</SheetTitle>
            <SheetDescription>
              Preencha os campos abaixo para criar um novo gibi.
            </SheetDescription>
          </SheetHeader>
          <CreateComicBookForm onSuccess={onComicBookCreated} onCancel={() => {}} />
        </SheetContent>
      </Sheet>
    </div>
  );
}
