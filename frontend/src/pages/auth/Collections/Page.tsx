import { useEffect, useState } from "react";
import { DashboardSidebar } from "@/components/custom/DashboardSidebar";
import { CollectionsHeader } from "./CollectionsHeader";
import { CollectionsTable } from "./CollectionsTable";
import { DashboardPagination } from "@/components/custom/DashboardPagination";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { UpdateCollectionForm } from "./UpdateCollectionForm";
import { useCollections } from "@/hooks/collections/useCollections";
import { useDeleteCollection } from "@/hooks/collections/useDeleteCollection";
import { Collection } from "@/types/collection";
import { getCollectionById } from "@/http/collections/getCollectionById";

export function CollectionsPage() {
  const {
    collections,
    currentPage,
    totalPages,
    fetchCollections,
    setCurrentPage,
  } = useCollections();
  const { handleDeleteCollection } = useDeleteCollection(fetchCollections);
  const [selectedCollectionToEdit, setSelectedCollectionToEdit] =
    useState<Collection | null>(null);

  useEffect(() => {
    fetchCollections();
  }, [currentPage]);

  const handleEdit = async (id: number) => {
    try {
      const collection = await getCollectionById(id);
      setSelectedCollectionToEdit(collection);
    } catch (error) {
      console.error("Erro ao buscar coleção:", error);
    }
  };

  return (
    <div className="flex min-h-screen w-full">
      <DashboardSidebar />
      <div className="flex flex-1 flex-col space-y-10 p-10">
        <CollectionsHeader onCollectionCreated={fetchCollections} />
        <div className="flex flex-1 flex-col justify-between">
          <CollectionsTable
            collections={collections}
            onDelete={handleDeleteCollection}
            onEdit={(collection) => handleEdit(collection.id)}
            currentPage={currentPage}
          />
          <Sheet
            open={!!selectedCollectionToEdit}
            onOpenChange={() => setSelectedCollectionToEdit(null)}
          >
            <SheetContent className="border-0 bg-(--background-color) p-4 sm:max-w-md">
              <SheetHeader>
                <SheetTitle className="text-white">Editar Coleção</SheetTitle>
                <SheetDescription>
                  Atualize as informações da coleção abaixo.
                </SheetDescription>
              </SheetHeader>
              {selectedCollectionToEdit && (
                <UpdateCollectionForm
                  collection={selectedCollectionToEdit}
                  onSuccess={() => {
                    fetchCollections();
                    setSelectedCollectionToEdit(null);
                  }}
                  onCancel={() => setSelectedCollectionToEdit(null)}
                />
              )}
            </SheetContent>
          </Sheet>
          <DashboardPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
}
