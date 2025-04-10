import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInput } from "@/components/custom/FormInput";
import { FormTextarea } from "@/components/custom/FormTextArea";
import {
  updateAuthorSchema,
  UpdateAuthorSchemaType,
} from "@/schemas/authorSchema";
import { CreateButton } from "@/components/custom/CreateButton";
import { useUpdateAuthor } from "@/hooks/authors/useUpdateAuthor";
import { Author } from "@/types/author";

interface UpdateAuthorFormProps {
  author: Author;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function UpdateAuthorForm({
  author,
  onSuccess,
  onCancel,
}: UpdateAuthorFormProps) {
  const { handleUpdateAuthor, isSubmitting } = useUpdateAuthor(
    author.id,
    onSuccess,
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateAuthorSchemaType>({
    resolver: zodResolver(updateAuthorSchema),
    defaultValues: {
      name: author.name,
      bio: author.bio,
      coverUrl: author.coverUrl,
    },
  });

  return (
    <form onSubmit={handleSubmit(handleUpdateAuthor)} className="space-y-4">
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

      <FormInput
        label="URL da Imagem do Autor"
        name="coverUrl"
        placeholder="URL da Imagem do Autor"
        register={register}
        error={errors.coverUrl?.message}
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
