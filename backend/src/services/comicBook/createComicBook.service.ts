import ComicBookModel from "../../models/ComicBookModel";

interface ComicBookInput {
  title: string;
  description?: string;
  coverUrl: string;
  genreId: string;
  collectionId?: string;
  authorId: string;
}

export const createComicBookService = async ({
  title,
  description,
  coverUrl,
  genreId,
  collectionId,
  authorId,
}: ComicBookInput) => {
  if (!title || !coverUrl || !genreId || !authorId) {
    throw new Error("MISSING_FIELDS");
  }

  const comicBook = await ComicBookModel.create({
    title,
    description,
    coverUrl,
    genreId,
    collectionId,
    authorId,
  });

  return comicBook;
};
