import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInput } from "@/components/custom/FormInput";
import { CreateButton } from "@/components/custom/CreateButton";
import {
  updateGenreSchema,
  UpdateGenreSchemaType,
} from "@/schemas/genreSchema";
import { useUpdateGenre } from "@/hooks/genres/useUpdateGenre";
import { Genre } from "@/types/genre";

interface UpdateGenreFormProps {
  genre: Genre;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function UpdateGenreForm({
  genre,
  onSuccess,
  onCancel,
}: UpdateGenreFormProps) {
  const { handleUpdateGenre, isSubmitting } = useUpdateGenre(
    genre.id,
    onSuccess,
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateGenreSchemaType>({
    resolver: zodResolver(updateGenreSchema),
    defaultValues: {
      name: genre.name,
    },
  });

  return (
    <form onSubmit={handleSubmit(handleUpdateGenre)} className="space-y-4">
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
