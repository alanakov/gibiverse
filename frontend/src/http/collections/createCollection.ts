import api from "@/services/api";
import { CreateCollectionSchemaType } from "@/schemas/collectionSchema";

export async function createCollection(data: CreateCollectionSchemaType) {
  const response = await api.post(`/collections`, data);
  return response.data;
}
