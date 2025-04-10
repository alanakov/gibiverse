import ComicBookModel from "../../models/ComicBookModel";

interface UpdateComicBookParams {
  id: string;
  title?: string;
  description?: string;
  coverUrl?: string;
  genreId?: number;
  collectionId?: number;
  authorId?: number;
}

export const updateComicBookService = async ({
  id,
  title,
  description,
  coverUrl,
  genreId,
  collectionId,
  authorId,
}: UpdateComicBookParams) => {
  const comicBook = await ComicBookModel.findByPk(id);
  if (!comicBook) return null;

  comicBook.title = title || comicBook.title;
  comicBook.description = description || comicBook.description;
  comicBook.coverUrl = coverUrl || comicBook.coverUrl;
  comicBook.genreId = genreId || comicBook.genreId;
  comicBook.collectionId = collectionId || comicBook.collectionId;
  comicBook.authorId = authorId || comicBook.authorId;

  await comicBook.save();
  return comicBook;
};
