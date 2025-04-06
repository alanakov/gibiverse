import { CreateCollectionSchemaType } from "@/schemas/collectionSchema";
import api from "@/services/api";

export async function createCollection(data: CreateCollectionSchemaType) {
  const response = await api.post("/collections", data);
  return response.data;
}
