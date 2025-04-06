import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInput } from "@/components/custom/FormInput";
import { FormTextarea } from "@/components/custom/FormTextArea";
import { CreateButton } from "@/components/custom/CreateButton";
import {
  updateCollectionSchema,
  UpdateCollectionSchemaType,
} from "@/schemas/collectionSchema";
import { useUpdateCollection } from "@/hooks/collections/useUpdateCollection";
import { Collection } from "@/types/collection";

interface UpdateCollectionFormProps {
  collection: Collection;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function UpdateCollectionForm({
  collection,
  onSuccess,
  onCancel,
}: UpdateCollectionFormProps) {
  const { handleUpdateCollection, isSubmitting } = useUpdateCollection(
    collection.id,
    onSuccess,
  );
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<UpdateCollectionSchemaType>({
    resolver: zodResolver(updateCollectionSchema),
  });

  useEffect(() => {
    setValue("name", collection.name ?? "");
    setValue("description", collection.description ?? "");
    setValue("authorId", collection.authorId);
  }, [collection, setValue]);

  return (
    <form onSubmit={handleSubmit(handleUpdateCollection)} className="space-y-4">
      <FormInput
        label="Nome"
        name="name"
        placeholder="Nome da Coleção"
        register={register}
        error={errors.name?.message}
      />
      <FormTextarea
        label="Descrição"
        name="description"
        placeholder="Descrição da Coleção"
        register={register}
        error={errors.description?.message}
      />
      <FormInput
        label="ID do Autor"
        name="authorId"
        placeholder="ID do Autor"
        type="number"
        register={register}
        error={errors.authorId?.message}
      />
      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={onCancel}
          className="cursor-pointer rounded-md border border-white px-4 py-2 text-sm font-medium text-white hover:bg-white hover:text-black"
        >
          Cancelar
        </button>
        <CreateButton type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Salvando..." : "Salvar"}
        </CreateButton>
      </div>
    </form>
  );
}
