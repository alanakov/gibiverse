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
  error?: string;
}

export function AuthorSelect({ value, onChange, error }: AuthorSelectProps) {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [selectedAuthor, setSelectedAuthor] = useState<Author | null>(null);

  useEffect(() => {
    async function fetchAuthors() {
      try {
        const data = await getAllAuthors();
        setAuthors(data.data);

        if (value) {
          const author = data.data.find((a: Author) => a.id === value) || null;
          setSelectedAuthor(author);
        }
      } catch (error) {
        console.error("Erro ao buscar autores:", error);
      }
    }
    fetchAuthors();
  }, [value]);

  const handleSelectChange = (val: string) => {
    const id = Number(val);
    const author = authors.find((a) => a.id === id) || null;
    setSelectedAuthor(author);
    onChange(id);
  };

  return (
    <div>
      <label className="block text-sm font-medium text-white">Autor</label>
      <Select
        value={selectedAuthor?.id.toString()}
        onValueChange={handleSelectChange}
      >
        <SelectTrigger className="w-full">
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
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
