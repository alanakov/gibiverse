import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInput } from "@/components/custom/FormInput";
import { FormTextarea } from "@/components/custom/FormTextArea";
import { editAuthorSchema, EditAuthorSchemaType } from "@/schemas/authorSchema";
import { CreateButton } from "@/components/custom/CreateButton";
import { useUpdateAuthor } from "@/hooks/authors/useUpdateAuthor";
import { Author } from "@/types/author";

interface EditAuthorFormProps {
  author: Author;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export const UpdateAuthorForm = ({
  author,
  onSuccess,
  onCancel,
}: EditAuthorFormProps) => {
  const { handleUpdateAuthor, isSubmitting } = useUpdateAuthor(
    author.id,
    onSuccess,
  );
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<EditAuthorSchemaType>({
    resolver: zodResolver(editAuthorSchema),
  });

  useEffect(() => {
    setValue("name", author.name);
    setValue("bio", author.bio);
  }, [author, setValue]);

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
};
