import { updateCollection } from "@/http/collections/updateCollection";
import { UpdateCollectionSchemaType } from "@/schemas/collectionSchema";
import { useState } from "react";
import { toast } from "sonner";

export function useUpdateCollection(id: number, onSuccess?: () => void) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleUpdateCollection = async (data: UpdateCollectionSchemaType) => {
    try {
      setIsSubmitting(true);
      await updateCollection(id, data);
      toast.success("Coleção atualizado com sucesso!");
      onSuccess?.();
    } catch (error) {
      console.error("Erro ao atualizar coleção:", error);
      toast.error("Erro ao atualizar coleção");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    handleUpdateCollection,
    isSubmitting,
  };
}
