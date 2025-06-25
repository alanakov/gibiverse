import GenreModel from "../../models/GenreModel";
import { paginate } from "../../utils/paginate";

interface GetAllGenresParams {
  page: number;
  limit: number;
}

export const getAllGenresService = async ({
  page,
  limit,
}: GetAllGenresParams) => {
  return await paginate({
    model: GenreModel,
    page,
    limit,
    order: [["createdAt", "DESC"]]
  });
};
