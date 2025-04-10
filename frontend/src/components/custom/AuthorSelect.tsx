import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuthors } from "@/hooks/authors/useAuthors";

interface AuthorSelectProps {
  value: number | null;
  onChange: (id: number) => void;
}

export function AuthorSelect({ value, onChange }: AuthorSelectProps) {
  const { authors, fetchAuthors } = useAuthors();
  const [selectedValue, setSelectedValue] = useState<string>("");

  useEffect(() => {
    if (authors.length === 0) {
      fetchAuthors();
    }
  }, [fetchAuthors, authors]);

  useEffect(() => {
    if (value !== null) {
      const selectedAuthor = authors.find((author) => author.id === value);
      setSelectedValue(selectedAuthor ? String(selectedAuthor.id) : "");
    }
  }, [value, authors]);

  const handleChange = (id: string) => {
    setSelectedValue(id);
    onChange(Number(id));
  };

  return (
    <div>
      <label className="mb-1 block text-sm text-zinc-200">Autor</label>
      <Select value={selectedValue} onValueChange={handleChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Selecione um autor">
            {authors.find((author) => String(author.id) === selectedValue)
              ?.name || "Selecione um autor"}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {authors.map((author) => (
            <SelectItem key={author.id} value={String(author.id)}>
              {author.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
