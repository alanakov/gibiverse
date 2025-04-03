import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { SheetClose } from "@/components/ui/sheet";
import { FormInput } from "@/components/custom/FormInput";
import { CreateButton } from "@/components/custom/CreateButton";
import { useEffect } from "react";
import { Author } from "./types";
import { FormTextarea } from "@/components/custom/FormTextArea";

const editAuthorSchema = z.object({
  nome: z
    .string()
    .min(3, { message: "Nome precisa ter pelo menos 3 caracteres" }),
  biografia: z
    .string()
    .min(10, { message: "Biografia precisa ter pelo menos 10 caracteres" }),
});

type EditAuthorSchemaType = z.infer<typeof editAuthorSchema>;

interface UpdateAuthorFormProps {
  author: Author;
  onSave: (data: EditAuthorSchemaType) => void;
}

export function UpdateAuthorForm({ author, onSave }: UpdateAuthorFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<EditAuthorSchemaType>({
    resolver: zodResolver(editAuthorSchema),
    defaultValues: {
      nome: author.nome,
      biografia: author.biografia,
    },
  });

  useEffect(() => {
    setValue("nome", author.nome);
    setValue("biografia", author.biografia);
  }, [author, setValue]);

  const onSubmit = (data: EditAuthorSchemaType) => {
    onSave(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
      <FormInput
        label="Nome"
        name="nome"
        placeholder="Nome do Autor"
        register={register}
        error={errors.nome?.message}
      />

      <FormTextarea
        label="Biografia"
        name="biografia"
        placeholder="Biografia do Autor"
        register={register}
        error={errors.biografia?.message}
      />

      <div className="flex justify-end">
        <SheetClose>
          <CreateButton type="submit">Salvar</CreateButton>
        </SheetClose>
      </div>
    </form>
  );
}
