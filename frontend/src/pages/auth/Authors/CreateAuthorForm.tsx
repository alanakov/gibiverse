import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { FormInput } from "@/components/custom/FormInput";
import { CreateButton } from "@/components/custom/CreateButton";
import { createAuthor } from "@/http/authors/createAuthor";
import { createAuthorSchema, CreateAuthorSchemaType } from "@/schemas/authorSchema";

interface CreateAuthorFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function CreateAuthorForm({ onSuccess, onCancel }: CreateAuthorFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateAuthorSchemaType>({
    resolver: zodResolver(createAuthorSchema),
  });

  const onSubmit = async (data: CreateAuthorSchemaType) => {
    try {
      await createAuthor(data);
      toast.success("Autor criado com sucesso!");
      onSuccess?.();
    } catch (error) {
      console.error("Erro ao criar autor:", error);
      toast.error("Erro ao criar autor");
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
}
