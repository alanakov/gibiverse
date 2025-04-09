import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInput } from "@/components/custom/FormInput";
import { CreateButton } from "@/components/custom/CreateButton";
import {
  createGenreSchema,
  CreateGenreSchemaType,
} from "@/schemas/genreSchema";
import { useCreateGenre } from "@/hooks/genres/useCreateGenre";

interface CreateGenreFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function CreateGenreForm({ onSuccess, onCancel }: CreateGenreFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateGenreSchemaType>({
    resolver: zodResolver(createGenreSchema),
  });

  const { handleCreateGenre, isSubmitting } = useCreateGenre(onSuccess);

  return (
    <form onSubmit={handleSubmit(handleCreateGenre)} className="space-y-4">
      <FormInput
        label="Nome"
        name="name"
        placeholder="Nome do Gênero"
        register={register}
        error={errors.name?.message}
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
