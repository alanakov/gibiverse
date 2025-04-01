import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { CreateAuthorForm } from "./CreateAuthorForm";
import { CreateButton } from "@/components/custom/CreateButton";

export function AuthorsHeader() {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-bold">Autores</h1>
      <Sheet>
        <SheetTrigger>
          <CreateButton name="Autor" />
        </SheetTrigger>
        <SheetContent className="border-0 bg-(--background-color) p-4 sm:max-w-md">
          <SheetHeader>
            <SheetTitle className="text-white">Criar Novo Autor</SheetTitle>
            <SheetDescription>
              Preencha os campos abaixo para criar um novo autor.
            </SheetDescription>
          </SheetHeader>
          <CreateAuthorForm />
        </SheetContent>
      </Sheet>
    </div>
  );
}
