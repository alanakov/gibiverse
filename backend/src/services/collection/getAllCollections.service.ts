import CollectionModel from "../../models/CollectionModel";
import { paginate } from "../../utils/paginate";

interface GetAllCollectionsParams {
  page: number;
  limit: number;
}

export const getAllCollectionsService = async ({
  page,
  limit,
}: GetAllCollectionsParams) => {
  return await paginate({
    model: CollectionModel,
    page,
    limit,
    order: [["name", "ASC"]],
  });
};
