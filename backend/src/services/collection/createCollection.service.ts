import CollectionModel from "../../models/CollectionModel";

interface CreateCollectionDTO {
  name: string;
  description?: string;
  authorId: number;
  coverUrl: string;
}

export const createCollectionService = async ({
  name,
  description,
  authorId,
  coverUrl,
}: CreateCollectionDTO) => {
  if (!name || !authorId || !coverUrl) {
    throw new Error("MISSING_FIELDS");
  }

  const collection = await CollectionModel.create({
    name,
    description,
    authorId,
    coverUrl,
  });

  return collection;
};
