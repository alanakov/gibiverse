import CollectionModel from "../../models/CollectionModel";

export const getCollectionByIdService = async (id: string) => {
  const collection = await CollectionModel.findByPk(id);

  if (!collection) {
    throw new Error("NOT_FOUND");
  }

  return collection;
};
