import { useState } from "react";
import { toast } from "sonner";
import { CreateCollectionSchemaType } from "@/schemas/collectionSchema";
import { createCollection } from "@/http/collections/createCollection";

export function useCreateCollection(onSuccess?: () => void) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreateCollection = async (data: CreateCollectionSchemaType) => {
    try {
      setIsSubmitting(true);
      await createCollection(data);
      toast.success("Coleção criado com sucesso!");
      onSuccess?.();
    } catch (error) {
      console.error("Erro ao criar coleção", error);
      toast.error("Erro ao criar coleção");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    handleCreateCollection,
    isSubmitting,
  };
}
