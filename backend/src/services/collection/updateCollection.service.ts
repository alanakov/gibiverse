import CollectionModel from "../../models/CollectionModel";

interface UpdateCollectionServiceProps {
  id: string;
  data: {
    name?: string;
    description?: string;
    authorId?: number;
    coverUrl?: string;
  };
}

export const updateCollectionService = async ({
  id,
  data,
}: UpdateCollectionServiceProps) => {
  const collection = await CollectionModel.findByPk(id);
  if (!collection) return null;

  await collection.update(data);
  return collection;
};
