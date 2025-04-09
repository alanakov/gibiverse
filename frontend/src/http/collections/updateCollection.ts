import api from "@/services/api";
import { UpdateCollectionSchemaType } from "@/schemas/collectionSchema";

export async function updateCollection(
  id: number,
  data: UpdateCollectionSchemaType,
) {
  const response = await api.put(`/collections/${id}`, data);
  return response.data;
}
