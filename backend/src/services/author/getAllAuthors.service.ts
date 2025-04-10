import AuthorModel from "../../models/AuthorModel";
import { paginate } from "../../utils/paginate";

interface GetAllAuthorsParams {
  page: number;
  limit: number;
}

export const getAllAuthorsService = async ({
  page,
  limit,
}: GetAllAuthorsParams) => {
  return await paginate({
    model: AuthorModel,
    page,
    limit,
    order: [["name", "ASC"]],
  });
};
