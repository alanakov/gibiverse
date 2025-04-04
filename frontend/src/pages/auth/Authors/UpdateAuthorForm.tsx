import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { updateAuthor } from "@/http/authors/updateAuthor";
import { FormInput } from "@/components/custom/FormInput";
import { editAuthorSchema, EditAuthorSchemaType } from "@/schemas/authorSchema";

interface EditAuthorFormProps {
  author: {
    id: number;
    name: string;
    bio: string;
  };
  onSuccess?: () => void;
}

export const EditAuthorForm = ({ author, onSuccess }: EditAuthorFormProps) => {
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
        <Button type="button" variant="outline">
          Cancelar
        </Button>
        <Button type="submit">Salvar</Button>
      </div>
    </form>
  );
};
