import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInput } from "@/components/custom/FormInput";
import { FormTextarea } from "@/components/custom/FormTextArea";
import { CreateButton } from "@/components/custom/CreateButton";
import { useCreateAuthor } from "@/hooks/authors/useCreateAuthor";
import {
  createAuthorSchema,
  CreateAuthorSchemaType,
} from "@/schemas/authorSchema";

type CreateAuthorFormProps = {
  onSuccess?: () => void;
  onCancel?: () => void;
};

export function CreateAuthorForm({
  onSuccess,
  onCancel,
}: CreateAuthorFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateAuthorSchemaType>({
    resolver: zodResolver(createAuthorSchema),
  });

  const { handleCreateAuthor, isSubmitting } = useCreateAuthor(onSuccess);

  return (
    <form onSubmit={handleSubmit(handleCreateAuthor)} className="space-y-4">
      <FormInput
        label="Nome"
        name="name"
        placeholder="Nome do Autor"
        register={register}
        error={errors.name?.message}
      />
      <FormTextarea
        label="Biografia"
        name="bio"
        placeholder="Biografia do Autor"
        register={register}
        error={errors.bio?.message}
      />
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
