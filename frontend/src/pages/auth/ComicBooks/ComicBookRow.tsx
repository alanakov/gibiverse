import { ComicBookActions } from "./ComicBookActions";
import { TableCell, TableRow } from "@/components/ui/table";
import { ComicBook as BaseComicBook } from "@/types/comicBook";
import { useEffect, useState } from "react";
import { useAuthors } from "@/hooks/authors/useAuthors";
import { useGenres } from "@/hooks/genres/useGenres";
import { useCollections } from "@/hooks/collections/useCollections";

interface ComicBook extends BaseComicBook {
  authorId: number;
  genreId: number;
  collectionId?: number;
}

interface ComicBookRowProps {
  comicBook: ComicBook;
  onEdit?: (comicBook: ComicBook) => void;
  onDelete?: (id: number) => void;
}

interface RelatedData {
  authorName: string;
  genreName: string;
  collectionName: string;
}

export function ComicBookRow({
  comicBook,
  onEdit,
  onDelete,
}: ComicBookRowProps) {
  const [relatedData, setRelatedData] = useState<RelatedData>({
    authorName: "-",
    genreName: "-",
    collectionName: "-",
  });

  const { authors, fetchAuthors } = useAuthors();
  const { genres, fetchGenres } = useGenres();
  const { collections, fetchCollections } = useCollections();

  useEffect(() => {
    fetchAuthors();
    fetchGenres();
    fetchCollections();
  }, []);

  useEffect(() => {
    const author = authors.find((author) => author.id === comicBook.authorId);
    const genre = genres.find((genre) => genre.id === comicBook.genreId);
    const collection = collections.find(
      (collection) => collection.id === comicBook.collectionId,
    );

    setRelatedData({
      authorName: author?.name || "-",
      genreName: genre?.name || "-",
      collectionName: collection?.name || "-",
    });
  }, [comicBook, authors, genres, collections]);

  return (
    <TableRow className="hover:bg-zinc-800">
      <TableCell>{comicBook.title}</TableCell>
      <TableCell>{comicBook.description}</TableCell>
      <TableCell>{relatedData.authorName}</TableCell>
      <TableCell>{relatedData.genreName}</TableCell>
      <TableCell>{relatedData.collectionName}</TableCell>
      <TableCell className="text-center">
        <ComicBookActions
          comicBook={comicBook}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </TableCell>
    </TableRow>
  );
}
