import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/custom/FormInput";

type FormField = {
  name: string;
  label: string;
  type?: string;
  placeholder: string;
};

interface AuthFormProps {
  title: string;
  fields: FormField[];
  schema: any;
  onSubmit: (data: any) => Promise<void>;
  buttonText: string;
  extraContent?: React.ReactNode;
}

export function AuthForm(props: AuthFormProps) {
  const form = useForm({
    resolver: zodResolver(props.schema),
  });

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md rounded bg-zinc-800 p-8 shadow">
        <header className="mb-6 flex items-center gap-3">
          <img className="w-8" src="../../src/assets/logo.svg" />
          <h1 className="text-2xl font-bold">Gibiverse</h1>
        </header>

        <h2 className="mb-4 text-2xl">{props.title}</h2>
        {props.extraContent && (
          <div className="mb-4 text-zinc-400">{props.extraContent}</div>
        )}

        <form
          onSubmit={form.handleSubmit(props.onSubmit)}
          className="space-y-4"
        >
          {props.fields.map((field) => (
            <FormInput
              key={field.name}
              {...field}
              register={form.register}
              error={form.formState.errors[field.name]?.message as string}
            />
          ))}

          <Button
            type="submit"
            className="w-full bg-red-500 hover:bg-red-600"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "Processando..." : props.buttonText}
          </Button>
        </form>
      </div>
    </div>
  );
}
