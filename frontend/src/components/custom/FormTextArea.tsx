import { Textarea } from "@/components/ui/textarea";

interface FormTextareaProps {
  label: string;
  name: string;
  placeholder?: string;
  register: any;
  error?: string;
  disabled?: boolean;
}

export function FormTextarea({
  label,
  name,
  placeholder,
  register,
  error,
  disabled = false,
}: FormTextareaProps) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="text-sm font-medium text-zinc-300">
        {label}
      </label>
      <Textarea
        id={name}
        placeholder={placeholder}
        {...register(name)}
        disabled={disabled}
        className={error ? "border-red-500" : ""}
        rows={4}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}
