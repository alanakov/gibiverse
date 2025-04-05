import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateAuthor } from "@/http/authors/updateAuthor";
import { FormInput } from "@/components/custom/FormInput";
import { editAuthorSchema, EditAuthorSchemaType } from "@/schemas/authorSchema";
import { CreateButton } from "@/components/custom/CreateButton";

interface EditAuthorFormProps {
  author: {
    id: number;
    name: string;
    bio: string;
  };
  onSuccess?: () => void;
  onCancel?: () => void;
}

export const UpdateAuthorForm = ({
  author,
  onSuccess,
  onCancel,
}: EditAuthorFormProps) => {
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

  const onSubmit = async (data: EditAuthorSchemaType) => {
    try {
      await updateAuthor(author.id, {
        name: data.name,
        bio: data.bio,
      });

      alert(`Autor "${data.name}" atualizado com sucesso!`);
      onSuccess?.();
    } catch (error) {
      console.error("Erro ao atualizar autor:", error);
      alert("Erro ao atualizar autor.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <FormInput
        label="Nome"
        name="name"
        placeholder="Nome do Autor"
        register={register}
        error={errors.name?.message}
      />

      <FormInput
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
        <CreateButton type="submit">Salvar</CreateButton>
      </div>
    </form>
  );
};
