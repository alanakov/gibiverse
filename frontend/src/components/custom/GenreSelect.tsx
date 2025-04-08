import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getAllGenres } from "@/http/genres/getAllGenres";

interface GenreSelectProps {
  value: number | null;
  onChange: (id: number) => void;
}

export function GenreSelect({ value, onChange }: GenreSelectProps) {
  interface Genre {
    id: number;
    name: string;
  }
  const [genres, setGenres] = useState<Genre[]>([]);
  const [selectedValue, setSelectedValue] = useState<string>("");

  useEffect(() => {
    async function fetchGenres() {
      try {
        const data = await getAllGenres();
        setGenres(data.data);
      } catch (error) {
        console.error("Erro ao buscar gêneros:", error);
      }
    }
    fetchGenres();
  }, []);

  useEffect(() => {
    if (value !== null) {
      const selectedGenre = genres.find((genre) => genre.id === value);
      setSelectedValue(selectedGenre ? String(selectedGenre.id) : "");
    }
  }, [value, genres]);

  const handleChange = (id: string) => {
    setSelectedValue(id);
    onChange(Number(id));
  };

  return (
    <div>
      <label className="mb-1 block text-sm text-zinc-200">Gênero</label>
      <Select value={selectedValue} onValueChange={handleChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Selecione um gênero">
            {genres.find((genre) => String(genre.id) === selectedValue)?.name ||
              "Selecione um gênero"}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {genres.map((genre) => (
            <SelectItem key={genre.id} value={String(genre.id)}>
              {genre.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
