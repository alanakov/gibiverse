import { Input } from "@/components/ui/input";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  register: any;
  error?: string;
  required?: boolean;
}

export function FormInput({
  label,
  name,
  register,
  error,
  required,
  ...rest
}: FormInputProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-white">
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </label>
      <Input {...register(name)} {...rest} />
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
