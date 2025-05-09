import { useEffect, useState } from "react";
import api from "@/services/api";
import { CustomCard } from "../../../../components/custom/CustomCard";
import { AuthorDetailsModal } from "../../../../components/custom/AuthorDetailsModal";
import { toast } from "sonner";

interface Author {
  id: number;
  name: string;
  bio: string;
  coverUrl: string;
  createdAt: string;
}

export function LatestAuthors() {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [selectedAuthor, setSelectedAuthor] = useState<Author | null>(null);

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const response = await api.get("/authors", {
          params: { page: 1, limit: 9999 },
        });

        const latestAuthors = response.data.data
          .sort(
            (a: Author, b: Author) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
          )
          .slice(0, 5);

        setAuthors(latestAuthors);
      } catch (error) {
        toast.error("Erro ao carregar autores. Tente novamente mais tarde.");
      }
    };

    fetchAuthors();
  }, []);

  const handleAuthorClick = async (author: Author) => {
    try {
      const response = await api.get(`/authors/${author.id}`);
      setSelectedAuthor(response.data);
    } catch (error) {
      toast.error(
        "Erro ao carregar detalhes do autor. Tente novamente mais tarde.",
      );
    }
  };

  return (
    <div>
      <h2 className="mb-6 text-xl font-semibold">
        Últimos autores cadastrados
      </h2>
      <div className="flex flex-nowrap items-center justify-center gap-6">
        {authors.length > 0 ? (
          authors.map((author) => (
            <CustomCard
              key={author.id}
              imageUrl={author.coverUrl}
              name={author.name}
              onClick={() => handleAuthorClick(author)}
            />
          ))
        ) : (
          <p className="text-muted-foreground text-center">
            Nenhum autor cadastrado até o momento.
          </p>
        )}
      </div>

      {selectedAuthor && (
        <AuthorDetailsModal
          isOpen={!!selectedAuthor}
          onClose={() => setSelectedAuthor(null)}
          author={selectedAuthor}
        />
      )}
    </div>
  );
}
