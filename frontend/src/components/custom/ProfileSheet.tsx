import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/custom/FormInput";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useProfile } from "@/contexts/ProfileContext";
import { CgProfile } from "react-icons/cg";
import { profileSchema, ProfileSchemaType } from "@/schemas/profileSchema";
import { useEffect } from "react";

export const ProfileSheet = () => {
  const { open, setOpen, user, updateUser } = useProfile();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProfileSchemaType>({
    resolver: zodResolver(profileSchema),
  });

  useEffect(() => {
    if (user) {
      reset({
        name: user.name,
        email: user.email,
        cpf: user.cpf || "",
      });
    }
  }, [user, reset]);

  const onSubmit = handleSubmit(async (data) => {
    await updateUser(data);
    setOpen(false);
  });

  if (!user) return null;

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
        <form onSubmit={onSubmit} className="space-y-4">
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
            disabled
          />
          <FormInput
            label="CPF"
            name="cpf"
            type="text"
            register={register}
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
