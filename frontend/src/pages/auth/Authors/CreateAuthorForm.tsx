import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { SheetClose } from "@/components/ui/sheet";
import { FormInput } from "@/components/custom/FormInput";
import { CreateButton } from "@/components/custom/CreateButton";

const createAuthorSchema = z.object({
  nome: z
    .string()
    .min(3, { message: "Nome precisa ter pelo menos 3 caracteres" }),
  biografia: z
    .string()
    .min(10, { message: "Biografia precisa ter pelo menos 10 caracteres" }),
});

type CreateAuthorSchemaType = z.infer<typeof createAuthorSchema>;

export function CreateAuthorForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateAuthorSchemaType>({
    resolver: zodResolver(createAuthorSchema),
  });

  const onSubmit = (data: CreateAuthorSchemaType) => {
    // simulaçao
    console.log("Dados do formulário:", data);
    alert(`Autor "${data.nome}" criado com sucesso!`);

    // implementar a chamada da api para salvar o autor no banco de dados
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
      <FormInput
        label="Biografia"
        name="biografia"
        placeholder="Biografia do Autor"
        register={register}
        error={errors.biografia?.message}
      />
      <div className="flex justify-end">
        <SheetClose>
          <CreateButton type="submit">Criar</CreateButton>
        </SheetClose>
      </div>
    </form>
  );
}
