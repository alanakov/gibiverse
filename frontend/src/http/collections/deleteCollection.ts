import api from "@/services/api";

export async function deleteCollection(id: number) {
  const response = await api.delete(`/collections/${id}`);
  return response.data;
}
