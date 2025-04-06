import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInput } from "@/components/custom/FormInput";
import { FormTextarea } from "@/components/custom/FormTextArea";
import { CreateButton } from "@/components/custom/CreateButton";
import { ComicBook } from "@/types/comicBook";
import {
  updateComicBookSchema,
  UpdateComicBookSchemaType,
} from "@/schemas/comicBookSchema";
import { useUpdateComicBook } from "@/hooks/comicbooks/useUpdateComicBook";

interface EditComicBookFormProps {
  comicBook: ComicBook;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export const UpdateComicBookForm = ({
  comicBook,
  onSuccess,
  onCancel,
}: EditComicBookFormProps) => {
  const { handleUpdateComicBook, isSubmitting } = useUpdateComicBook(
    comicBook.id,
    onSuccess,
  );
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<UpdateComicBookSchemaType>({
    resolver: zodResolver(updateComicBookSchema),
  });

  useEffect(() => {
    setValue("title", comicBook.title);
    setValue("description", comicBook.description);
    setValue("authorId", comicBook.authorId);
    setValue("coverUrl", comicBook.coverUrl);
  }, [comicBook, setValue]);

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

      <FormInput
        label="ID do Autor"
        name="authorId"
        placeholder="ID do Autor"
        type="number"
        register={register}
        error={errors.authorId?.message}
      />

      <FormInput
        label="URL da Capa"
        name="coverUrl"
        placeholder="URL da Capa"
        register={register}
        error={errors.coverUrl?.message}
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
