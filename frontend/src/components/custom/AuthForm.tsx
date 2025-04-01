import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/custom/FormInput";
import { JSX } from "react/jsx-runtime";

interface AuthFormProps {
  title: string;
  fields: { name: string; label: string; type?: string; placeholder: string }[];
  schema: any;
  onSubmit: (data: any) => Promise<void>;
  buttonText: string;
  extraContent?: JSX.Element;
}

export function AuthForm({
  title,
  fields,
  schema,
  onSubmit,
  buttonText,
  extraContent,
}: AuthFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema), mode: "onSubmit" });

  return (
    <section className="flex min-h-screen items-center justify-center bg-(--background-color)">
      <div className="w-full max-w-2xl rounded-lg bg-zinc-800 p-12 shadow-md">
        <div className="mb-10 flex items-center space-x-4">
          <img className="w-10" src="../../src/assets/logo.svg" />
          <h1 className="text-4xl font-bold">Gibiverse</h1>
        </div>
        <h1 className="pb-4 text-4xl font-semibold">{title}</h1>
        {extraContent && (
          <div className="mb-4 text-zinc-400">{extraContent}</div>
        )}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          {fields.map(({ name, label, type, placeholder }) => (
            <FormInput
              key={name}
              label={label}
              name={name}
              type={type || "text"}
              placeholder={placeholder}
              register={register}
              error={errors[name]?.message as string}
            />
          ))}
          <Button
            type="submit"
            className="mt-4 w-full cursor-pointer rounded-md bg-red-500 py-4 font-semibold text-white hover:bg-red-700"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Processando..." : buttonText}
          </Button>
        </form>
      </div>
    </section>
  );
}
