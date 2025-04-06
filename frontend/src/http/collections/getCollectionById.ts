import api from "@/services/api";
import { Collection } from "@/types/collection";

export async function getCollectionById(id: number): Promise<Collection> {
  const response = await api.get(`/collections/${id}`);
  return response.data;
}
