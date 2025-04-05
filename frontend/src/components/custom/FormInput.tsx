import { Input } from "@/components/ui/input";

interface FormInputProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  register: any;
  error?: string;
  disabled?: boolean;
}

export function FormInput({
  label,
  name,
  type = "text",
  placeholder,
  register,
  error,
  disabled = false,
}: FormInputProps) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="text-sm font-medium text-zinc-300">
        {label}
      </label>
      <Input
        id={name}
        type={type}
        placeholder={placeholder}
        {...register(name)}
        disabled={disabled}
        className={error ? "border-red 500" : ""}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}
