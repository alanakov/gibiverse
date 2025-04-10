import { useState } from "react";
import { createCollection } from "@/http/collections/createCollection";
import { CreateCollectionSchemaType } from "@/schemas/collectionSchema";
import { toast } from "sonner";

export function useCreateCollection(onSuccess?: () => void) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreateCollection = async (data: CreateCollectionSchemaType) => {
    try {
      setIsSubmitting(true);
      await createCollection(data);
      toast.success("Coleção criada com sucesso!");
      onSuccess?.();
    } catch (error) {
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
