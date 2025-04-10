import ComicBookModel from "../../models/ComicBookModel";

export const getComicBookByIdService = async (id: string) => {
  const comicBook = await ComicBookModel.findByPk(id);

  if (!comicBook) {
    throw new Error("NOT_FOUND");
  }

  return comicBook;
};
