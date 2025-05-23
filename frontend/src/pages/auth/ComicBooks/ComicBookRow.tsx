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
      <TableCell className="w-[200px] max-w-[200px] truncate overflow-hidden whitespace-nowrap">
        {comicBook.title}
      </TableCell>
      <TableCell className="w-[300px] max-w-[300px] truncate overflow-hidden whitespace-nowrap">
        {comicBook.description}
      </TableCell>
      <TableCell className="w-[150px] max-w-[150px] truncate overflow-hidden whitespace-nowrap">
        {relatedData.authorName}
      </TableCell>
      <TableCell className="w-[150px] max-w-[150px] truncate overflow-hidden whitespace-nowrap">
        {relatedData.genreName}
      </TableCell>
      <TableCell className="w-[150px] max-w-[150px] truncate overflow-hidden whitespace-nowrap">
        {relatedData.collectionName}
      </TableCell>
      <TableCell className="w-[100px] text-center">
        <ComicBookActions
          comicBook={comicBook}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </TableCell>
    </TableRow>
  );
}
