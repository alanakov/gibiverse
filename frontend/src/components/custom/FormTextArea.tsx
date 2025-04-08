interface FormTextareaProps {
  label: string;
  name: string;
  register: any;
  error?: string;
  placeholder?: string;
}

export const FormTextarea = ({
  label,
  name,
  register,
  error,
  placeholder,
}: FormTextareaProps) => {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="text-sm font-medium text-zinc-300">
        {label}
      </label>
      <textarea
        id={name}
        placeholder={placeholder}
        {...register(name)}
        className="min-h-[100px] rounded-md border border-zinc-700 bg-transparent p-2 text-sm text-slate-300 focus:ring-1 focus:ring-gray-400 focus:outline-none"
      />
      {error && <span className="text-sm text-red-500">{error}</span>}
    </div>
  );
};
