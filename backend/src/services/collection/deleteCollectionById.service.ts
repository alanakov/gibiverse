import CollectionModel from "../../models/CollectionModel";

export const deleteCollectionByIdService = async (id: string) => {
  const collection = await CollectionModel.findByPk(id);
  if (!collection) return null;

  await collection.destroy();
  return true;
};
