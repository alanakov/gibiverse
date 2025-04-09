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
import { AuthorSelect } from "@/components/custom/AuthorSelect";

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
    defaultValues: {
      name: collection.name,
      description: collection.description || "",
      authorId: collection.authorId,
    },
  });

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
      <div>
        <AuthorSelect
          value={collection.authorId}
          onChange={(id) => setValue("authorId", id)}
        />
        {errors.authorId && (
          <p className="text-sm text-red-500">{errors.authorId.message}</p>
        )}
      </div>
      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={() => {
            onCancel?.();
          }}
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
