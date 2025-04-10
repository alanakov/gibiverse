import ComicBookModel from "../../models/ComicBookModel";
import { paginate } from "../../utils/paginate";

interface GetAllComicBooksParams {
  page: number;
  limit: number;
}

export const getAllComicBooksService = async ({
  page,
  limit,
}: GetAllComicBooksParams) => {
  return await paginate({
    model: ComicBookModel,
    page,
    limit,
    order: [["title", "ASC"]],
  });
};
