import { useEffect, useState } from "react";
import api from "@/services/api";
import { CustomCard } from "../../../../components/custom/CustomCard";
import { ComicDetailsModal } from "../../../../components/custom/ComicDetailsModal";
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
  Author?: { id: number; name: string };
  Genre?: { id: number; name: string };
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
            limit: 9999,
          },
        });

        const latestComics = response.data.data
          .sort(
            (a: Comic, b: Comic) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
          )
          .slice(0, 5);

        setComics(latestComics);
      } catch (error) {
        toast.error("Erro ao carregar gibis. Tente novamente mais tarde.");
      }
    };

    fetchComics();
  }, []);

  const handleComicClick = async (comic: Comic) => {
    try {
      const response = await api.get(`/comicbooks/${comic.id}`, {
        params: {
          include: "author,genre,collection",
        },
      });

      setSelectedComic(response.data);
    } catch (err) {
      toast.error("Erro ao carregar os detalhes do gibi.");
    }
  };

  return (
    <div>
      <h2 className="mb-6 text-xl font-semibold">Últimos gibis cadastrados</h2>
      <div className="flex flex-nowrap items-center justify-center gap-6">
        {comics.length > 0 ? (
          comics.map((comic) => (
            <CustomCard
              key={comic.id}
              imageUrl={comic.coverUrl}
              name={comic.title}
              onClick={() => handleComicClick(comic)}
            />
          ))
        ) : (
          <p className="text-muted-foreground text-center">
            Nenhum gibi cadastrado até o momento.
          </p>
        )}
      </div>

      {selectedComic && (
        <ComicDetailsModal
          isOpen={!!selectedComic}
          onClose={() => setSelectedComic(null)}
          comicId={selectedComic.id}
        />
      )}
    </div>
  );
}
