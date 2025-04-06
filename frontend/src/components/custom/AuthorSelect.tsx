import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getAllAuthors } from "@/http/authors/getAllAuthors";
import { Author } from "@/types/author";

interface AuthorSelectProps {
  value?: number;
  onChange: (authorId: number) => void;
}

export function AuthorSelect({ value, onChange }: AuthorSelectProps) {
  const [authors, setAuthors] = useState<Author[]>([]);

  useEffect(() => {
    async function fetchAuthors() {
      try {
        const data = await getAllAuthors();
        setAuthors(data.data);
      } catch (error) {
        console.error("Erro ao buscar autores:", error);
      }
    }
    fetchAuthors();
  }, []);

  return (
    <Select
      value={value?.toString()}
      onValueChange={(val) => onChange(Number(val))}
    >
      <SelectTrigger>
        <SelectValue placeholder="Selecione um autor" />
      </SelectTrigger>
      <SelectContent>
        {authors.map((author) => (
          <SelectItem key={author.id} value={author.id.toString()}>
            {author.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
