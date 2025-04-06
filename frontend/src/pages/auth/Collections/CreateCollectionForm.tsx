import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInput } from "@/components/custom/FormInput";
import { FormTextarea } from "@/components/custom/FormTextArea";
import { CreateButton } from "@/components/custom/CreateButton";
import {
  createCollectionSchema,
  CreateCollectionSchemaType,
} from "@/schemas/collectionSchema";
import { useCreateCollection } from "@/hooks/collections/useCreateCollection";

interface CreateCollectionFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function CreateCollectionForm({
  onSuccess,
  onCancel,
}: CreateCollectionFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateCollectionSchemaType>({
    resolver: zodResolver(createCollectionSchema),
  });

  const { handleCreateCollection, isSubmitting } =
    useCreateCollection(onSuccess);

  return (
    <form onSubmit={handleSubmit(handleCreateCollection)} className="space-y-4">
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
