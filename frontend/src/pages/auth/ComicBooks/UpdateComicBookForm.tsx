import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ComicBook } from "@/types/comicBook";
import {
  updateComicBookSchema,
  UpdateComicBookSchemaType,
} from "@/schemas/comicBookSchema";
import { FormInput } from "@/components/custom/FormInput";
import { FormTextarea } from "@/components/custom/FormTextArea";
import { GenreSelect } from "@/components/custom/GenreSelect";
import { CreateButton } from "@/components/custom/CreateButton";
import { useUpdateComicBook } from "@/hooks/comicbooks/useUpdateComicBook";
import { AuthorSelect } from "@/components/custom/AuthorSelect";
import { CollectionSelect } from "@/components/custom/CollectionSelect";

interface UpdateComicBookFormProps {
  comicBook: ComicBook;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function UpdateComicBookForm({
  comicBook,
  onSuccess,
  onCancel,
}: UpdateComicBookFormProps) {
  const { handleUpdateComicBook, isSubmitting } = useUpdateComicBook(
    comicBook.id,
    onSuccess,
  );

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<UpdateComicBookSchemaType>({
    resolver: zodResolver(updateComicBookSchema),
    defaultValues: {
      title: comicBook.title,
      description: comicBook.description || "",
      coverUrl: comicBook.coverUrl,
      authorId: comicBook.authorId,
      genreId: comicBook.genreId,
    },
  });

  return (
    <form onSubmit={handleSubmit(handleUpdateComicBook)} className="space-y-4">
      <FormInput
        label="Título"
        name="title"
        placeholder="Título do Gibi"
        register={register}
        error={errors.title?.message}
      />
      <FormTextarea
        label="Descrição"
        name="description"
        placeholder="Descrição do Gibi"
        register={register}
        error={errors.description?.message}
      />
      <div>
        <GenreSelect
          value={watch("genreId")}
          onChange={(id) => setValue("genreId", id)}
        />
        {errors.genreId && (
          <p className="text-sm text-red-500">{errors.genreId.message}</p>
        )}
      </div>

      <div>
        <AuthorSelect
          value={comicBook.authorId}
          onChange={(id) => setValue("authorId", id)}
        />
        {errors.authorId && (
          <p className="text-sm text-red-500">{errors.authorId.message}</p>
        )}
      </div>
      <div>
        <CollectionSelect
          value={watch("collectionId")}
          onChange={(id) => setValue("collectionId", id ?? undefined)}
        />
      </div>
      <FormInput
        label="URL da Capa do Gibi"
        name="coverUrl"
        placeholder="URL da Capa do Gibi"
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
