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
      <textarea
        id={name}
        placeholder={placeholder}
        {...register(name)}
        disabled={disabled}
        className={`w-full resize-none rounded-md border border-zinc-700 bg-(--background-color) px-4 py-2 text-white outline-none focus:border-red-500 ${
          error ? "border-red-500" : ""
        } ${disabled ? "cursor-not-allowed opacity-50" : ""}`}
        rows={4}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}
