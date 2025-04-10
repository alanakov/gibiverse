import ComicBookModel from "../../models/ComicBookModel";

export const deleteComicBookByIdService = async (id: string) => {
  const comicBook = await ComicBookModel.findByPk(id);
  if (!comicBook) return false;

  await comicBook.destroy();
  return true;
};
