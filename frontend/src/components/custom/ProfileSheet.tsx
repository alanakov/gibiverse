import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/custom/FormInput";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useProfile } from "@/contexts/ProfileContext";
import { CgProfile } from "react-icons/cg";
import { toast } from "sonner";
import { profileSchema, ProfileSchemaType } from "@/schemas/profileSchema";

export const ProfileSheet = () => {
  const { open, setOpen, user, setUser } = useProfile();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProfileSchemaType>({
    resolver: zodResolver(profileSchema),
    defaultValues: user,
  });

  const onSubmit = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setUser(data);
      toast.success("Perfil atualizado com sucesso!");
      setOpen(false);
    } catch (error) {
      toast.error("Erro ao atualizar perfil. Tente novamente.");
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button className="flex w-full flex-col items-center justify-center py-3 text-sm font-medium text-white transition-colors duration-200">
          <CgProfile className="mb-1 h-10 w-10 cursor-pointer" />
        </button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="w-[400px] border-0 bg-(--background-color) p-6"
      >
        <h2 className="mb-4 text-lg font-semibold">Perfil do Usuário</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <FormInput
            label="Nome"
            name="name"
            register={register}
            error={errors.name?.message}
          />
          <FormInput
            label="E-mail"
            name="email"
            type="email"
            register={register}
            error={errors.email?.message}
          />
          <FormInput
            label="CPF"
            name="cpf"
            register={register}
            type="text"
            disabled
          />
          <Button
            type="submit"
            className="w-full cursor-pointer bg-red-500 hover:bg-red-700"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Salvando..." : "Salvar"}
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  );
};
