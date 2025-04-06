import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { CreateButton } from "@/components/custom/CreateButton";
import { CreateCollectionForm } from "./CreateCollectionForm";

interface CollectionsHeaderProps {
  onCollectionCreated?: () => void;
}

export function CollectionsHeader({
  onCollectionCreated,
}: CollectionsHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-bold">Coleções</h1>
      <Sheet>
        <SheetTrigger>
          <CreateButton name="Coleção" />
        </SheetTrigger>
        <SheetContent className="border-0 bg-(--background-color) p-4 sm:max-w-md">
          <SheetHeader>
            <SheetTitle className="text-white">Criar Nova Coleção</SheetTitle>
            <SheetDescription>
              Preencha os campos abaixo para criar uma nova coleção.
            </SheetDescription>
          </SheetHeader>
          <CreateCollectionForm
            onSuccess={onCollectionCreated}
            onCancel={() => {}}
          />
        </SheetContent>
      </Sheet>
    </div>
  );
}
