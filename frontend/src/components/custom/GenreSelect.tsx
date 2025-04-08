import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getAllGenres } from "@/http/genres/getAllGenres";
import { Genre } from "@/types/genre";

interface GenreSelectProps {
  value?: number;
  onChange: (genreId: number) => void;
}

export function GenreSelect({ value, onChange }: GenreSelectProps) {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<Genre | null>(null);

  useEffect(() => {
    async function fetchGenres() {
      try {
        const data = await getAllGenres();
        setGenres(data.data);

        if (value) {
          const genre = data.data.find((g: Genre) => g.id === value) || null;
          setSelectedGenre(genre);
        }
      } catch (error) {
        console.error("Erro ao buscar gêneros:", error);
      }
    }
    fetchGenres();
  }, [value]);

  const handleSelectChange = (val: string) => {
    const id = Number(val);
    const genre = genres.find((g) => g.id === id) || null;
    setSelectedGenre(genre);
    onChange(id);
  };

  return (
    <div>
      <label className="block text-sm font-medium text-white">Gênero</label>
      <Select
        value={selectedGenre?.id.toString()}
        onValueChange={handleSelectChange}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Selecione um gênero" />
        </SelectTrigger>
        <SelectContent>
          {genres.map((genre) => (
            <SelectItem key={genre.id} value={genre.id.toString()}>
              {genre.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
