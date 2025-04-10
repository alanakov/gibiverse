import { useEffect, useState } from "react";
import api from "@/services/api";
import { CustomCard } from "../custom/CustomCard";
import { ComicDetailsModal } from "../custom/ComicDetailsModal";
import { toast } from "sonner";

interface Comic {
  id: number;
  title: string;
  description: string;
  coverUrl: string;
  createdAt: string;
  authorId: number;
  genreId: number;
  collectionId?: number;
  Author: { id: number; name: string };
  Genre: { id: number; name: string };
  Collection?: { id: number; name: string };
}

export function LatestComics() {
  const [comics, setComics] = useState<Comic[]>([]);
  const [selectedComic, setSelectedComic] = useState<Comic | null>(null);

  useEffect(() => {
    const fetchComics = async () => {
      try {
        const response = await api.get("/comicbooks", {
          params: {
            page: 1,
            limit: 5,
            include: "author,genre,collection",
          },
        });

        const latestComics = response.data.data.sort(
          (a: Comic, b: Comic) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );

        setComics(latestComics);
      } catch (error) {
        toast.error("Erro ao carregar gibis. Tente novamente mais tarde.");
      }
    };

    fetchComics();
  }, []);

  const handleComicClick = async (comic: Comic) => {
    setSelectedComic(comic);
  };

  return (
    <div>
      <h2 className="mb-6 text-xl font-semibold">Últimos gibis cadastrados</h2>
      <div className="flex flex-nowrap items-center justify-center gap-6">
        {comics.slice(0, 5).map((comic) => (
          <CustomCard
            key={comic.id}
            imageUrl={comic.coverUrl}
            name={comic.title}
            onClick={() => handleComicClick(comic)}
          />
        ))}
      </div>

      {selectedComic && (
        <ComicDetailsModal
          isOpen={!!selectedComic}
          onClose={() => setSelectedComic(null)}
          comic={selectedComic}
        />
      )}
    </div>
  );
}
