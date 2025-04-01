interface FormInputProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  register: any;
  error?: string;
}

export function FormInput({
  label,
  name,
  type = "text",
  placeholder,
  register,
  error,
}: FormInputProps) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="text-sm font-medium text-zinc-300">
        {label}
      </label>
      <input
        id={name}
        type={type}
        placeholder={placeholder}
        {...register(name)}
        className={`w-full rounded-md border border-zinc-700 bg-(--background-color) px-4 py-2 text-white outline-none focus:border-red-500 ${
          error ? "border-red-500" : ""
        }`}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}
