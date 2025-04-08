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
      <label htmlFor={name} className="text-sm font-medium text-white">
        {label}
      </label>
      <textarea
        id={name}
        placeholder={placeholder}
        {...register(name)}
        className="min-h-[100px] rounded-md border border-gray-300 bg-transparent p-2 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
      {error && <span className="text-sm text-red-500">{error}</span>}
    </div>
  );
};
