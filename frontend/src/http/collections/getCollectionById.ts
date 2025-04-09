import api from "@/services/api";

export async function getCollectionById(id: number) {
  const response = await api.get(`/collections/${id}`);
  return response.data;
}
